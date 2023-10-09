// Main interface

export interface CollectionMessage {
  days60: string;
  days90: string;
  days120: string;
}

export interface FinancialSetup {
  financialCharge: boolean;
  annualInterestPercent: number;
  minimumFinanceCharge: string;
  rebillFreeAmount: number;
  minimumBalanceToIncur: string;  
}

export interface FeeSchedule {
  id: number;
  practiceId: number;
  feeScheduleType: string;
  procedureCode: string;
  amount: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export interface StatementOptions {
  insurance: string;
  nonInsurance: string;
  financialArrangment: string;
  quickStatement: string;
  financeCharge: string;  
}

export interface PracticeInformation {
  name: string;
  email: string;
  phone: number;
  NPI: number;
  dentalLicense: string;
  taxId: number;
  DEANumber: number;
}

export interface SystemPreference {
  defaulProvider: number,
  showPopupReminder: boolean,
  changePasswordHowManyDays: number,
  usePermanentDentitionOlderThan: number,
  defaultToBenefitsAssigned: boolean,
  defaultToReleaseInsuranceInfo: boolean,
  alwaysHoldSecondaryClains: boolean,
  defaulMedicalClaimAssignment: boolean,
  feeSchedule: string,
  sendStatement: boolean,
  financeCharges: boolean,
  collectionMessages: boolean,
  printStatementEstimates: boolean,
  hideAccountsYearsOlderThan: number,
  defaultRecallMonthInterval: number,
  recallMethod: string,
  autoCreateRecall: boolean,
  promptUCRUpdatesWhenPostingInsurancePayments: boolean,
  onlyShowTransactionsAfter: string
}
