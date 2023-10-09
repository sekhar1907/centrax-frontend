export interface IOwner {
  ownerFullname: string
  ownerPhone: string
  ownerEmail: string
  contactPersonSameAsOwner: boolean
  contactPerson: IContactPerson
  NPI: string
  dentalLicense: string
  taxId: string
  DEANumber: string
}

export interface IContactPerson {}
