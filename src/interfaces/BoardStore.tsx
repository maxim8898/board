import Board from "./Board";

export default interface BoardStore {
  boards: Map<string, Board>,
  active: string,
}