export interface Resource {
  id: number
  providerId: number
  name: string
  resourceType: string
  createdAt: string
  updatedAt: string
}

export interface CreateResourceDto {
  providerId: number
  name: string
  resourceType: string
}
