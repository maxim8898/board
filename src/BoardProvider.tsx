import React, { ReactElement, FC } from "react";
import {useAppDispatch, useAppSelector} from "./hooks";
import {closeModal} from "./slices/boardSlice";
import Modal from "./components/ui/Modal";
import BoardForm from "./components/forms/BoardForm";

interface BoardProviderProps {
  children: ReactElement,
}

export const BoardProvider: FC<BoardProviderProps> = ({ children }: BoardProviderProps) => {
  const dispatch = useAppDispatch();
  const {isModalOpen, currentModalForm} = useAppSelector((state) => state.board);

  const modalFormElement = () => {
    switch (currentModalForm) {
      case "boardForm":
        return <BoardForm/>;
      default:
        return <></>;
    }
  };


  return (
    <>
      {children}
      {isModalOpen &&
          <Modal open={isModalOpen} onClose={() => dispatch(closeModal())}>
            {modalFormElement()}
          </Modal>
      }
    </>
  )
}
export default BoardProvider;
