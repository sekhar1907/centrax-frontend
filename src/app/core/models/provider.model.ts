export interface IProvider {
  id: number
  dentalSchool: string
  website: string
  blog: string
  facebook: string
  twitter: string
  about: string
  acceptingNewPatients: number
  dentistGender: string
  acceptingApptRequests: number
  childFriendly: number
  eveningsAndWeekends: number
  acceptsMedicaid: number
  handicapAccess: number
  seniorFriendly: number
  holisticDentistry: number
  languages: string
  mobileNumber: string
  weeklySchedule: IWeeklySchedule
  createdAt: string
  updatedAt: string
  externalId: any
  userId: number
  providerName?: string
  firstname?: string
  lastname?: string
  NPI?: string
}

export interface IWeeklySchedule {
  mon: ISchedule;
  tue: ISchedule;
  wed: ISchedule;
  thu: ISchedule;
  fri: ISchedule;
  sat: ISchedule;
  sun: ISchedule;
}

export interface ISchedule {
  from: string;
  to: string;
}
