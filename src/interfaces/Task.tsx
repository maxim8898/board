export interface Task {
  id: string,
  section: string,
  title: string,
  description: string,
  status: boolean,
  weight: number,
  author: string,
  created: number,
  updated: number,
}

export default Task;