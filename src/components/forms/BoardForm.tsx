import {FC} from "react";
import {useForm} from "react-hook-form";
import {Box, Typography, Button, TextField} from "@mui/material";
import { v4 as uuid } from "uuid";
import { set, ref } from "firebase/database";
import {database} from "../../config/fb_config";
import {useAppDispatch} from "../../hooks";
import {closeModal, setActive} from "../../slices/boardSlice";

interface BoardFormInputs {
  title: string,
  status: boolean,
}

export const BoardForm: FC = () => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BoardFormInputs>();
  const onSubmit = async (data: BoardFormInputs) => {
    const boardId = uuid();
    const boardsRef = ref(database, `/boards/${boardId}`);
    const board = {id: boardId, name: data.title, status: true, columns: {}};
    await set(boardsRef, {...board});
    dispatch(closeModal());
    dispatch(setActive(boardId));
  }

  return(
    <Box
      component="form"
      sx={{'& > :not(style)': {m: 1}, display: 'flex', flexDirection: 'column'}}
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

      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
}

export default BoardForm;