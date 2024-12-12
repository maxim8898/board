import Task from "./Task";

export interface Section {
  id: string,
  name: string,
  board: string,
  weight: number,
  allow_add: boolean,
  status: boolean,
  tasks: Record<string, Task>
}

export default Section;