import { FC } from "react"
import { Paper } from "@mui/material";
import { Task } from "../../interfaces";
interface TaskCardProps {
  task: Task
  onClick: () => void,
}

export const TaskCard: FC<TaskCardProps> = ({ task, onClick }) => {
  return (
    <Paper
      key={ task.id }
      sx={{
        padding: 2,
        backgroundColor: '#ffffff',
        borderRadius: 1,
        boxShadow: 1,
      }}
      onClick={ onClick }
    >
      { task.title }
    </Paper>
  )
}

export default TaskCard;