import { FC, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Typography, Button, TextField, Autocomplete } from "@mui/material";
import { v4 as uuid } from "uuid";
import { set, ref, onValue } from "firebase/database";
import { database } from "../../config/fb_config";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeModal, setActive } from "../../slices/boardSlice";

interface User {
  uid: string;
  name: string;
}

interface BoardFormInputs {
  title: string;
  contributors: string[];
}

interface BoardFormProps {
  id?: string;
  name?: string;
  owner?: string;
  contributors?: string[];
  formMode: "create" | "edit";
}

export const BoardForm: FC<BoardFormProps> = ({ id, name, owner, contributors, formMode }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { boards } = useAppSelector((state) => state.board);
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
  } = useForm<BoardFormInputs>({
    defaultValues: {
      title: name || "",
      contributors: contributors || [],
    },
  });

  const onSubmit = async (data: BoardFormInputs) => {
    const isNew = !!id;
    const boardId = id ? id : uuid();
    const boardsRef = ref(database, `/boards/${boardId}`);
    const board = boards[boardId] || {
      id: boardId,
      name: data.title,
      status: true,
      owner: user?.uid,
      contributors: data.contributors,
      columns: {
        todo: { id: "todo", name: "To Do", board: boardId, weight: 0, allow_add: true, status: true, tasks: {} },
        "in-progress": { id: "in-progress", name: "In Progress", board: boardId, weight: 1, allow_add: false, status: true, tasks: {} },
        done: { id: "done", name: "Done", board: boardId, weight: 2, allow_add: false, status: true, tasks: {} },
      },
    };
    await set(boardsRef, { ...board, name: data.title, contributors: data.contributors });

    if (isNew) {
      dispatch(setActive(boardId));
    }

    dispatch(closeModal());
  };

  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1 }, display: "flex", flexDirection: "column" }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h6">Create a New Board</Typography>

      <TextField
        {...register("title", {
          required: "Title is required",
          minLength: { value: 3, message: "Title must be at least 3 characters long" },
        })}
        label="Board Title"
        variant="outlined"
        error={!!errors.title}
        helperText={errors.title ? errors.title.message : ""}
      />

      <Controller
        name="contributors"
        control={control}
        render={({ field }) => (
          <Autocomplete
            multiple
            options={availableUsers}
            getOptionLabel={(option) => option.name}
            value={availableUsers.filter((user) => field.value.includes(user.uid))}
            onChange={(_, newValue) => field.onChange(newValue.map((user) => user.uid))}
            renderInput={(params) => <TextField {...params} label="Contributors" variant="outlined" />}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default BoardForm;
