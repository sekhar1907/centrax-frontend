export interface CreateRootCanalDto {
  treatmentProvider: string
  treatmentAssistant1: string
  parq?: boolean
  medicalHxReviewed?: boolean
  treatmentAssistant2?: string
  next?: string
  topicalAnesthetic?: boolean
  firstAnesthetic?: string
  firstAnestheticCarpules?: string
  secondAnesthetic?: string
  secondAnestheticCarpules?: string
  n2o?: boolean
  n2oPercent?: string
  n2oMin?: string
  o2Fluse?: boolean
  o2Min?: string
  psa?: boolean
  msa?: boolean
  asa?: boolean
  ia?: boolean
  lb?: boolean
  pal?: boolean
  infiltrate?: boolean
  tooth?: string
  rootList?: Root[]
  irrigation?: string
  fillingMaterial?: string
  sealer?: string
  temporaryMaterial?: string
  postOpBp?: string
  radiographsTaken?: string
  treatmentNotes?: string
}

export interface Root {
  text: string
  text1: string
  text2: string
}
