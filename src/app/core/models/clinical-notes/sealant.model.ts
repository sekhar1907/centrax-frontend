export interface CreateSealantDto {
  treatmentProvider: string;
  doctor: string;
  dentalAssistant?: string;
  hygienist?: string;
  healthHistoryReviewed?: string;
  noChange?: boolean;
  change?: boolean;
  changeTxt?: string;
  consentAndEPO?: boolean;
  sealants?: string;
  etch?: boolean;
  flossed?: boolean;
  ultraseal?: boolean;
  biteCheck?: boolean;
  notes?: string;
  ohiReviewed?: string;
  parqAddressed?: string;
  nextApptHygiene?: string;
  nextApptDoctor?: string;
  socialHistory?: string;
}
