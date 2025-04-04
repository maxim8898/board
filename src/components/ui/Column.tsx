import { FC } from "react"
import { Box, Button, Typography } from "@mui/material";
import { Section , Task } from "../../interfaces";
import { TaskCard } from "./index";
import { useDroppable } from "@dnd-kit/core";

interface ColumnProps {
  column: Section,
  addTaskHandler: () => void,
  taskFormHandler: (
    taskId: string,
  ) => void,
}

export const Column: FC<ColumnProps> = ({ column, addTaskHandler, taskFormHandler }) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })
  return (
    <Box
      ref={ setNodeRef }
      key={ column.id }
      sx={{
        minWidth: 300,
        backgroundColor: '#f0f0f0',
        borderRadius: 2,
        padding: 2,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
        { column.name }
        { column.allow_add &&
          <Button
            key={'add-task'}
            onClick={addTaskHandler}
            sx={{ display: 'block' }}
          >
            Add Task
          </Button>
        }
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        { column.tasks && Object.entries(column.tasks as Record<string, Task>)
          .map(([id, task]: [string, Task]) => (
          <TaskCard
            key={ id }
            taskId={ id }
            column={ column.id }
            board={ column.board }
            onClick={() => taskFormHandler(id)}
          />
        ))}
      </Box>
    </Box>
  )
}

export default Column