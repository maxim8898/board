import { FC } from "react"
import { Paper } from "@mui/material";
import { Task } from "../../interfaces";
import { useDraggable } from "@dnd-kit/core";
interface TaskCardProps {
  task: Task
  onClick: () => void,
}

export const TaskCard: FC<TaskCardProps> = ({ task, onClick }) => {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: task.id,
    data: {column: task.section}
  });

  return (
    <Paper
      ref={ setNodeRef }
      key={ task.id }
      sx={{
        padding: 2,
        backgroundColor: '#ffffff',
        borderRadius: 1,
        boxShadow: 1,
      }}
      onClick={ onClick }
      {...listeners}
      {...attributes}
    >
      { task.title }
    </Paper>
  )
}

export default TaskCard;