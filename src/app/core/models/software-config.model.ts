export interface ISoftwareConfig {
  practice: Practice
  practiceFeeSchedule: PracticeFeeSchedule
  practiceBilling: PracticeBilling
  contactPerson: ContactPerson
  administrativeStaffs: Staff[]
  medicalStaffs: any[]
  systemPreference: SystemPreference
  financialSetup: FinancialSetup
  statementOption: StatementOption
  collectionMessageInsurance: CollectionMessageInsurance
  collectionMessageNonInsurance: CollectionMessageNonInsurance
  collectionMessageStatement: CollectionMessageStatement
}

export interface Practice {
  id: number
  name: string
  email: string
  phone: string
  NPI: string
  dentalLicense: string
  taxId: string
  DEANumber: string
}

export interface PracticeFeeSchedule {
  id: number
  feeSchedule: any
}

export interface PracticeBilling {
  id: number
  changeHealthCare: boolean
}

export interface ContactPerson {
  id: number
  fullname: string
  email: string
  phone: string
  jobTitle: string
  practiceId: number
  createdAt: string
  updatedAt: string
}

export interface Staff {
  id: number
  fullname: string
  practiceId: number
  suffix: string
  type: string
  birthDate: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zip: string
  title: string
  hireDate: string
  permissions: string
  NPI: string
  dentalLicense: string
  DEANumber: string
  createdAt: string
  updatedAt: string
  images: string[]
}

export interface SystemPreference {
  id: number
  practiceId: number
  defaulProvider: number
  showPopupReminder: boolean
  changePasswordHowManyDays: number
  usePermanentDentitionOlderThan: number
  defaultToBenefitsAssigned: boolean
  defaultToReleaseInsuranceInfo: boolean
  alwaysHoldSecondaryClains: boolean
  defaulMedicalClaimAssignment: boolean
  feeSchedule: string
  sendStatement: boolean
  financeCharges: any
  collectionMessages: any
  printStatementEstimates: any
  hideAccountsYearsOlderThan: number
  defaultRecallMonthInterval: number
  recallMethod: string
  autoCreateRecall: boolean
  promptUCRUpdatesWhenPostingInsurancePayments: boolean
  onlyShowTransactionsAfter: string
  createdAt: string
  updatedAt: string
}

export interface FinancialSetup {
  id: number
  practiceId: number
  financialCharge: boolean
  annualInterestPercent: number
  minimumFinanceCharge: string
  rebillFreeAmount: number
  minimumBalanceToIncur: string
  createdAt: string
  updatedAt: string
}

export interface StatementOption {
  id: number
  practiceId: number
  paymentGracePerios: number
  accountBalanceAmount: string
  defaultPaymentDueDate: number
  highlightPrintedStatement: boolean
  printEstimateedPortion: boolean
  acceptedCard: string
  createdAt: string
  updatedAt: string
}

export interface CollectionMessageInsurance {
  id: number
  days60: string
  days90: string
  days120: string
}

export interface CollectionMessageNonInsurance {
  id: number
  days60Non: string
  days90Non: string
  days120Non: string
}

export interface CollectionMessageStatement {
  id: number
  insurance: string
  nonInsurance: string
  financialArrangment: string
  quickStatement: string
  financeCharge: string
}
