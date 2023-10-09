export interface PracticeTodoDto {
  date: string
  todo: string
}

export interface PracticeTodo {
  id: number
  practiceId: number
  creatorUserId: number
  date: string
  todo: string
  createdAt: string
  updatedAt: string
}

export interface PracticeTodoList {
  today: PracticeTodo[];
  later: PracticeTodo[];
}
