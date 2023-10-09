export class Patient {
  patient?: PatientInfo
  responsibleParty?: ResponsibleParty
  insurances?: Insurances
  dentalHistory?: DentalHistory
  medicalHistory?: MedicalHistory
  medications?: Medication[]

  get patientName(): string {
    return `${this.patient?.firstName} ${this.patient?.lastName}`
  }

  constructor(fields?: {
    responsibleParty?: ResponsibleParty,
    patient?: PatientInfo,
    insurances?: Insurances,
    dentalHistory?: DentalHistory,
    medicalHistory?: MedicalHistory,
    medications?: Medication[],
  }) {
    if (fields) Object.assign(this, {...fields})
  }
}

export interface PatientInfo {
  id: number
  firstName: string
  middleName: string
  lastName: string
  prefferedName: string
  address: string
  city: string
  state: string
  zip: string
  primaryPhone: string
  alternativePhone: string
  dob: string
  gender: string
  genderIdentity: string
  prefferedPronouns: string
  emergencyContact: string
  emergencyPrimaryPhone: string
  emergencyContactPatientRelation: string
  responsiblePartyId: number
  sign: string
  date: string
  employerId: any
  hippaSign: string
  hippaDate: string
  financialAgreementSign: string
  financialAgreementDate: string
  consentSign: string
  consentDate: string
  createdAt: string
  updatedAt: string
  patientId: string
}

export interface ResponsibleParty {
  id: number
  firstName: string
  middleName: string
  lastName: string
  prefferedName: string
  address: string
  city: string
  state: string
  zip: string
  primaryPhone: string
  alternativePhone: string
  dob: string
  gender: string
  genderIdentity: string
  prefferedPronouns: string
  emergencyContact: string
  emergencyPrimaryPhone: string
  emergencyContactPatientRelation: string
  responsiblePartyId: number
  sign: string
  date: string
  employerId: any
  hippaSign: string
  hippaDate: string
  financialAgreementSign: string
  financialAgreementDate: string
  consentSign: string
  consentDate: string
  createdAt: string
  updatedAt: string
}

export interface Insurances {
  primaryInsurance: PrimaryInsurance
}

export interface PrimaryInsurance {
  id: number
  patientId: number
  insuranceId: number
  subcriberId: string
  group: string
  subscriberPersonType: string
  subscriberPersonId: number
  insuranceType: string
  createdAt: string
  updatedAt: string
  planName: string
  subscriberPersonData: SubscriberPersonData
}

export interface SubscriberPersonData {
  id: number
  firstName: string
  middleName: string
  lastName: string
  prefferedName: string
  address: string
  city: string
  state: string
  zip: string
  primaryPhone: string
  alternativePhone: string
  dob: string
  gender: string
  genderIdentity: string
  prefferedPronouns: string
  emergencyContact: string
  emergencyPrimaryPhone: string
  emergencyContactPatientRelation: string
  responsiblePartyId: number
  sign: string
  date: string
  employerId: any
  hippaSign: string
  hippaDate: string
  financialAgreementSign: string
  financialAgreementDate: string
  consentSign: string
  consentDate: string
  createdAt: string
  updatedAt: string
  patientRelation: string
}

export interface DentalHistory {
  id: number
  patientId: number
  reasonOfVisit: string
  dentalProvider: string
  dateOfLastVisit: string
  address: string
  city: string
  state: string
  zip: string
  officePhone: string
  badBreathing: boolean
  bleedingGuns: boolean
  clickingJaw: boolean
  coldSores: any
  foodCollection: any
  grindingTeeth: any
  looseTeeth: any
  periodontalTreatment: any
  radiationalTreatment: any
  sensitivityToCold: any
  sensitivityToHeat: any
  sensitivityToSweets: any
  sensitivityWhenBiting: any
  soresOfGrowthsInMouth: any
  surgeryToMouthOrGums: any
  floss: any
  brush: any
  seriousComplication: any
  complicationExplain: any
  currentDentalHealth: any
  createdAt: string
  updatedAt: string
}

export interface MedicalHistory {
  id: number
  patientId: number
  primaryCareProvider: string
  address: string
  city: string
  state: string
  zip: string
  officePhone: string
  pregnantOrNursing: string
  useAlcohol: boolean
  alcoholType: string
  hospitalized: boolean
  explanationOfIllness: string
  allergic: boolean
  allergicExplanation: string
  skinCondition: boolean
  changesOnSkinColor: boolean
  visualChange: any
  glaucoma: any
  eyeSurgery: any
  lossOfHearing: any
  tinnitus: any
  frequentNoseBleeds: any
  sinusProblem: any
  hepatities: any
  jaundice: any
  ulcers: any
  heartburn: any
  dryMouth: any
  difficultySwallowing: any
  elevatedCholesterol: any
  chestPain: any
  heartAttack: any
  shortnessOfBreath: any
  stroke: any
  swellingOfAnkles: any
  highBloodPressure: any
  congenitalHeartDisease: any
  atrificialHeartValve: any
  pacemaker: any
  heartSurgery: any
  other: any
  tuberculosis: any
  difficultyBreathing: any
  emphysema: any
  asthma: any
  presistentCough: any
  kidneyDisease: any
  increaseUrination: any
  venerealDisease: any
  arthritis: any
  artificialJoints: any
  backProblems: any
  takenBisphosphonates: any
  headaches: any
  convulsions: any
  numbness: any
  dizziness: any
  psychiatricTreatement: any
  dementia: any
  tendencyOfBruise: any
  anemia: any
  bloodTransfusion: any
  abnormalBleeding: any
  anticoagulant: any
  radiationTherapy: any
  tumors: any
  cancer: any
  immuneSuppressionDisorder: any
  note: any
  sign: string
  date: string
  createdAt: string
  updatedAt: string
}

export interface Medication {
  id: number
  patientId: number
  medication: string
  reason: string
  createdAt: string
  updatedAt: string
}
