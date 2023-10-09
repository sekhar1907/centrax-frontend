export interface CreateSptHygieneDto {
  provider: string
  units: string
  treatmentCompleted: string
  perioHealth: string
  preBp: string
  postBp: string
  oralSedation: string
  hemoDebride: HemoDebride
  inflammation: Inflammation
  consistency: Consistency
  necroticTissue: NecroticTissue
  subCalc: SubCalc
  supraCalc: SupraCalc
  stain: Stain
  comments: string
  treatmentList: TreatmentList[]
  arestinLocation: string
  flourideLocation: string
  painMedDisp: string
  homeCare: string
  anestheticList: AnestheticList[]
  anestheticNote: string
  n2o: string
  totalLiterVolumn: string
  duration: string
  o2Fluse: string
  durationO2: string
}

export interface HemoDebride {
  location: string
  serverity: string
  site: string
}

export interface Inflammation {
  location: string
  serverity: string
  site: string
}

export interface Consistency {
  location: string
  serverity: string
  site: string
}

export interface NecroticTissue {
  location: string
  serverity: string
  site: string
}

export interface SubCalc {
  location: string
  serverity: string
  site: string
}

export interface SupraCalc {
  location: string
  serverity: string
  site: string
}

export interface Stain {
  location: string
  serverity: string
  site: string
}

export interface TreatmentList {
  name: string
  location: Location
}

export interface Location {
  fm: any
  ur: string
  lr: string
  ll: string
  other: string
}

export interface AnestheticList {
  name: string
  amount: number
  locations: Locations
}

export interface Locations {
  ial: boolean
  b: boolean
  mental: boolean
  psa: boolean
  msa: boolean
  np: boolean
  gp: boolean
  amsa: boolean
  infiltrate: string
}
