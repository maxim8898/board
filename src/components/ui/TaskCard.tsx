import { FC, useEffect, useState } from "react";
import { Paper, Typography, Autocomplete, TextField } from "@mui/material";
import { Task } from "../../interfaces";
import { useDraggable } from "@dnd-kit/core";
import { onValue, ref, set } from "firebase/database";
import { database } from "../../config/fb_config";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../../hooks";

interface TaskCardProps {
  taskId: string;
  column: string;
  board: string;
  onClick: () => void;
}

interface User {
  uid: string;
  name: string;
}

interface TaskFormInputs {
  assignee: string;
}

export const TaskCard: FC<TaskCardProps> = ({ taskId, column, board, onClick }) => {
  const { boards } = useAppSelector((state) => state.board);
  const task: Task = boards[board]['columns'][column]['tasks'][taskId];

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: {column: task.section}
  });
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);

  const assign = async (value: string) => {
    const tasksRef = ref(database, `/boards/${board}/columns/${task.section}/tasks/${task.id}`);
    await set(tasksRef, {...task, assignee: value});
  }

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
    control,
  } = useForm<TaskFormInputs>({
    defaultValues: {
      assignee: task.assignee || "unassigned",
    },
  });

  return (
    <Paper
      ref={setNodeRef}
      key={task.id}
      sx={{
        padding: 2,
        backgroundColor: '#ffffff',
        borderRadius: 1,
        boxShadow: isDragging ? 6 : 1,
        opacity: isDragging ? 0.9 : 1,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : 'none',
        transition: 'box-shadow 0.2s ease, opacity 0.2s ease',
        cursor: 'default',
      }}
      {...attributes}
    >
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16}}>
        <Typography variant="h6" onClick={onClick}>{task.title}</Typography>

        <div
          {...listeners}
          style={{
            cursor: 'grab',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 8,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="caption" color="text.secondary">::</Typography>
        </div>
      </div>

      <Controller
        name="assignee"
        control={control}
        render={({field}) => (
          <Autocomplete
            options={availableUsers}
            value={availableUsers.find(user => user.uid === field.value) || null}
            getOptionLabel={(option) => option.name}
            onChange={(_, newValue) => {
              const newAssignee = newValue ? newValue.uid : "unassigned";
              field.onChange(newAssignee);
              assign(newAssignee);
            }}
            renderInput={(params) => <TextField {...params} label="Assignee" variant="outlined"/>}
          />
        )}
      />
    </Paper>
  );
};

export default TaskCard;