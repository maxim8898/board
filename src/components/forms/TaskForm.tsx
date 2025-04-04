import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { v4 as uuid } from "uuid";
import { set, ref, onValue } from "firebase/database";
import { database } from "../../config/fb_config";
import { useAppDispatch } from "../../hooks";
import { closeModal } from "../../slices/boardSlice";
import { Task } from "../../interfaces";

interface TaskFormInputs {
  title: string,
  description: string,
  status: boolean,
  assignee: string,
}

interface TaskFormProps {
  id?: string,
  title?: string,
  description?: string,
  assignee: string,
  board: string,
  section?: string,
  formMode: 'create' | 'edit',
}

interface User {
  uid: string;
  name: string;
}

export const TaskForm: FC<TaskFormProps> = ({board, section, id, title, description, assignee, formMode}) => {
  const dispatch = useAppDispatch();

  const [availableUsers, setAvailableUsers] = useState<User[]>([]);

  useEffect(() => {
    const usersRef = ref(database, "/users/");
    onValue(usersRef, (snapshot) => {
      if (snapshot.exists()) {
        setAvailableUsers(
          Object.values(snapshot.val()).map((user: any) => ({ uid: user.uid, name: user.name }))
        );
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskFormInputs>({
    defaultValues: {
      title: title,
      description: description,
      assignee: assignee,
    }
  });
  const onSubmit = async (data: TaskFormInputs) => {
    const taskId = id ? id : uuid();
    const tasksRef = ref(database, `/boards/${board}/columns/${section}/tasks/${taskId}`);
    const task: Task = {
      id: taskId,
      section: section ? section : '',
      title: data.title,
      description: data.description,
      status: true,
      weight: 0,
      author: 'admin',
      created: 1,
      updated: 1,
      assignee: data.assignee,
    };
    await set(tasksRef, {...task});
    dispatch(closeModal());
  }

  const deleteTask = async () => {
    const tasksRef = ref(database, `/boards/${board}/columns/${section}/tasks/${id}`);
    await set(tasksRef, null);
    dispatch(closeModal());
  }

  return(
    <Box
      component="form"
      sx={{'& > :not(style)': {m: 1}, display: 'flex', flexDirection: 'column'}}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("title", {
          required: "Title is required",
          minLength: { value: 3, message: "Title must be at least 3 characters long" },
        })}
        label="Title"
        variant="outlined"
        error={!!errors.title}
        helperText={errors.title ? errors.title.message : ""}
      />

      <TextField
        {...register("description", {
          minLength: { value: 3, message: "Description must be at least 3 characters long" },
        })}
        label="Description"
        variant="outlined"
        error={!!errors.description}
        helperText={errors.description ? errors.description.message : ""}
      />

      <Controller
        name="assignee"
        control={control}
        render={({ field }) => (
          <Autocomplete
            options={availableUsers}
            value={availableUsers.find(user => user.uid === field.value) || null}
            getOptionLabel={(option) => option.name}
            onChange={(_, newValue) => {
              const newAssignee = newValue ? newValue.uid : "unassigned";
              field.onChange(newAssignee);
            }}
            renderInput={(params) => <TextField {...params} label="Assignee" variant="outlined" />}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
      {formMode &&
        <Button key={'delete-button'} variant="contained" color="secondary" onClick={deleteTask}>
          Delete
        </Button>
      }
    </Box>
  );
}

export default TaskForm;