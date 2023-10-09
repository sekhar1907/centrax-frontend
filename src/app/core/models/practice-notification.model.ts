export interface CreatePracticeNotificationDto {
  recepientLocation: number
  recepientRole: number
  message: string
}

export interface PracticeNotification {
  id: number
  recepientLocation: number
  recepientRole: number
  practiceId: number
  creatorUserId: number
  message: string
  createdAt: string
  updatedAt: string
}
