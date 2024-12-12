import Section from "./Section";

export interface Board {
  id: string,
  name: string,
  status: boolean,
  columns: Record<string, Section>,
}

export default Board;