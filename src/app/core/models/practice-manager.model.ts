// Main interface

export interface IPracticeDetail {
  name: string;
  email: string;
  phone: string;
  NPI: string;
  dentalLicense: string;
  taxId: string;
  DEANumber: string;
}

export interface IContactPerson {
  fullname: string;
  email: string;
  phone: string;
  jobTitle: string;
}

export interface IStaffList {
  images: string[];
  fullname: string;
  suffix: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  title: string;
  hireDate: string;
  permissions: string;
  NPI: string;
  dentalLicense: string;
  DEANumber: string;
}

export interface ISystemPreference {
  defaulProvider: number;
  showPopupReminder: boolean;
  changePasswordHowManyDays: number;
  usePermanentDentitionOlderThan: number;
  defaultToBenefitsAssigned: boolean;
  defaultToReleaseInsuranceInfo: boolean;
  alwaysHoldSecondaryClains: boolean;
  defaulMedicalClaimAssignment: boolean;
  feeSchedule: string;
  sendStatement: boolean;
  financeCharges: boolean;
  collectionMessages: boolean;
  printStatementEstimates: boolean;
  hideAccountsYearsOlderThan: number;
  defaultRecallMonthInterval: number;
  recallMethod: string;
  autoCreateRecall: boolean;
  promptUCRUpdatesWhenPostingInsurancePayments: boolean;
  onlyShowTransactionsAfter: string;
}

export interface IPracticeBilling {
  changeHealthCare: boolean;
}

export interface IFinancialSetup {
  financialCharge: boolean;
  annualInterestPercent: number;
  minimumFinanceCharge: string;
  rebillFreeAmount: number;
  minimumBalanceToIncur: string;
}

export interface IStatementOpt {
  paymentGracePerios: number;
  accountBalanceAmount: string;
  defaultPaymentDueDate: number;
  highlightPrintedStatement: boolean;
  printEstimateedPortion: boolean;
  acceptedCard: string;
}

export interface ICollectionMessagesIns {
  days60: string;
  days90: string;
  days120: string;
}

export interface ICollectionMessagesNonIns {
  days60Non: string;
  days90Non: string;
  days120Non: string;
}

export interface ICollectionStatMessages {
  insurance: string;
  nonInsurance: string;
  financialArrangment: string;
  quickStatement: string;
  financeCharge: string;
}
//OLD
export interface IPracticeManager {
  practice: {
    name: any;
    email: any;
    phone: any;
    NPI: any;
    dentalLicense: any;
    taxId: any;
    DEANumber: any;
    freeSchedule: any;
    changeHealthCare: boolean;
  };
  contactPerson: {
    fullname: any;
    email: any;
    phone: any;
    jobTitle: any;
  };
  staffs: Staff[];
  systemPreference: SystemPreferences;
  financialSetup: FinancialSetup;
  statementOption: StatementOption;
  collectionMessage: CollectionMessage;
}


// Interface for staff image
export interface StaffImage {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

// Interface for staff
export interface Staff {
  images: StaffImage[];
  fullname: string;
  suffix: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  title: string;
  hireDate: string;
  permissions: string;
  NPI: string;
  dentalLicense: string;
  DEANumber: string;
}

// Interface for system preferences
export interface SystemPreferences {
  defaulProvider: number;
  showPopupReminder: boolean;
  changePasswordHowManyDays: number;
  usePermanentDentitionOlderThan: number;
  defaultToBenefitsAssigned: boolean;
  defaultToReleaseInsuranceInfo: boolean;
  alwaysHoldSecondaryClains: boolean;
  defaulMedicalClaimAssignment: boolean;
  feeSchedule: string;
  sendStatement: boolean;
  financeCharges: boolean;
  collectionMessages: boolean;
  printStatementEstimates: boolean;
  hideAccountsYearsOlderThan: number;
  defaultRecallMonthInterval: number;
  recallMethod: string;
  autoCreateRecall: boolean;
  promptUCRUpdatesWhenPostingInsurancePayments: boolean;
  onlyShowTransactionsAfter: string;
}

// Interface for financial setup
export interface FinancialSetup {
  financialCharge: boolean;
  annualInterestPercent: number;
  minimumFinanceCharge: string;
  rebillFreeAmount: number;
  minimumBalanceToIncur: string;
}

// Interface for statement options
export interface StatementOption {
  paymentGracePerios: number;
  accountBalanceAmount: string;
  defaultPaymentDueDate: number;
  highlightPrintedStatement: boolean;
  printEstimateedPortion: boolean;
  acceptedCard: string;
}

// Interface for collection messages
export interface CollectionMessage {
  days60: string;
  days90: string;
  days120: string;
  insurance: string;
  nonInsurance: string;
  financialArrangment: string;
  quickStatement: string;
  financeCharge: string;
}


//
export interface FeeSchedule {
  description: string;
  amount: number | string;
  procedureCode: string;
  procedureType: string;
}

