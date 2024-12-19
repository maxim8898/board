import {FC, useState} from "react"
import { Section } from "../../interfaces";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeModal, openModal } from "../../slices/boardSlice";
import { Column, Modal } from "./index"
import { TaskForm } from "../forms";

interface TaskFormProps {
  id?: string,
  title?: string,
  description?: string,
  board: string,
  section?: string,
  formMode: 'create' | 'edit',
}

export const Board: FC = () => {
  const {boards, active, isModalOpen, currentModalForm} = useAppSelector((state) => state.board);
  const [taskFormProps, setTaskFormProps] = useState<TaskFormProps>({
    board: active,
    formMode: 'create'
  });
  const activeBoard = boards[active];
  const dispatch = useAppDispatch();

  const openTaskForm = async (boardId: string, columnId: string, formMode: 'create' | 'edit', taskId?: string) => {
    switch (formMode) {
      case "create":
        setTaskFormProps(prevState => ({
          ...prevState,
          board: active,
          section: columnId,
          formMode: formMode,
          id: undefined,
          title: undefined,
          description: undefined,
        }));
        dispatch(openModal({formId: 'taskForm'}))
        break;

      case "edit":
        if (taskId) {
          const task = activeBoard['columns'][columnId]['tasks'][taskId];
          setTaskFormProps(prevState => ({
            ...prevState,
            board: active,
            section: columnId,
            formMode: formMode,
            id: taskId,
            title: task['title'],
            description: task['description'],
          }));
          dispatch(openModal({formId: 'taskForm'}))
        }
        break;
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, padding: 2, overflowX: 'auto' }}>
        { boards && activeBoard && activeBoard.columns && Object.entries(activeBoard.columns as Record<string, Section>)
          .sort(([, a], [, b]) => (a.weight || 0) - (b.weight || 0))
          .map(([id, column]: [string, Section]) => (
            <Column
              column={column}
              addTaskHandler={() => openTaskForm(column.board, column.id, 'create')}
              taskFormHandler={(id) => openTaskForm(column.board, column.id, 'edit', id)}
            />
          ))}
      </Box>
      { isModalOpen && currentModalForm === 'taskForm' &&
          <Modal
              open={ isModalOpen }
              onClose={() => dispatch(closeModal())}
          >
              <TaskForm
                  board={ taskFormProps.board }
                  section={ taskFormProps.section }
                  formMode={ taskFormProps.formMode }
                  id={ taskFormProps.id }
                  title={ taskFormProps.title }
                  description={ taskFormProps.description }
              />
          </Modal>
      }
    </>
  )
}

export default Board;