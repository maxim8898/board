import Board from "./Board";

export interface BoardStore {
  boards: Record<string, Board>,
  active: string,
  loading: boolean,
  isModalOpen: boolean,
  currentModalForm: string,
}

export default BoardStore;