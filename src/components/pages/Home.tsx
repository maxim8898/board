import React, {FC, useState} from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks";
import { Section, Task } from "../../interfaces";
import {closeModal, openModal} from "../../slices/boardSlice";
import Modal from "../ui/Modal";
import TaskForm from "../forms/TaskForm";

interface TaskFormProps {
  id?: string,
  title?: string,
  description?: string,
  board: string,
  section?: string,
  formMode: 'create' | 'edit',
}

export const Home: FC = () => {
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
      <Container maxWidth="xl" sx={{ height: '100%' }}>
        <Box sx={{ display: 'flex', gap: 2, padding: 2, overflowX: 'auto' }}>
          { boards && activeBoard && activeBoard.columns && Object.entries(activeBoard.columns as Record<string, Section>)
            .sort(([, a], [, b]) => (a.weight || 0) - (b.weight || 0))
            .map(([id, column]: [string, Section]) => (
            <Box
              key={id}
              sx={{
                minWidth: 300,
                backgroundColor: '#f0f0f0',
                borderRadius: 2,
                padding: 2,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {column.name}
                { column.allow_add &&
                    <Button
                        key={'add-task'}
                        onClick={() => openTaskForm(column.board, column.id, 'create')}
                        sx={{ display: 'block' }}
                    >
                        Add Task
                    </Button>
                }
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                { column.tasks && Object.entries(column.tasks as Record<string, Task>).map(([id, task]: [string, Task]) => (
                    <Paper
                    key={id}
                    sx={{
                      padding: 2,
                      backgroundColor: '#ffffff',
                      borderRadius: 1,
                      boxShadow: 1,
                    }}
                    onClick={() => openTaskForm(column.board, column.id, 'edit', id)}
                  >
                    {task.title}
                  </Paper>
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
      {isModalOpen && currentModalForm === 'taskForm' &&
        <Modal
            open={isModalOpen}
            onClose={() => dispatch(closeModal())}
        >
          <TaskForm
              board={taskFormProps.board}
              section={taskFormProps.section}
              formMode={taskFormProps.formMode}
              id={taskFormProps.id}
              title={taskFormProps.title}
              description={taskFormProps.description}
          />
        </Modal>
      }
    </>
  );
}

export default Home;