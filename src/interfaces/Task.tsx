export default interface Task {
  id: string,
  board: string,
  title: string,
  description: string,
  status: boolean,
  weight: number,
}