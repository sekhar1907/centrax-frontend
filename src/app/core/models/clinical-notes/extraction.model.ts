export interface Extraction {
  tooth: string;
  extractionType: string;
  instrumentation?: string;
  diagnosis?: string;
}

export interface CreateExtractionDto {
  treatmentProvider: string;
  treatmentAssistant: string;
  next?: string;
  parq?: boolean;
  medicalHxReviewed?: boolean;
  preBp?: boolean;
  topicalAnesthetic?: boolean;
  firstAnesthetic?: string;
  firstAnestheticCarpules?: string;
  n2o?: boolean;
  n2oPercent?: string;
  n2oMin?: string;
  secondAnesthetic?: string;
  secondAnestheticCarpules?: string;
  o2?: boolean;
  o2Min?: string;
  psa?: boolean;
  msa?: boolean;
  asa?: boolean;
  ia?: boolean;
  lb?: boolean;
  pal?: boolean;
  infiltrate?: boolean;
  extractionList: Extraction[];
  postOpInstructionGiven?: string;
  postOpBp?: string;
  treatmentNotes?: string;
}
