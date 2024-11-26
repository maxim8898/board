import Board from "./Board";

export interface BoardStore {
  boards: Map<string, Board>,
  active: string,
}

export default BoardStore;