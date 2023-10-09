export interface Filling {
  toothNumber: string;
  surfaces: string;
  restorationtype: string;
  shade?: string;
  etch35Percent: boolean;
  optibondAdhesive: boolean;
  vitrabondBase: boolean;
  recordWithEpi: boolean;
}

export interface CreateFillingDto {
  treatmentProvider: string;
  treatmentAssistant1: string;
  parq?: boolean;
  medicalHxReviewed?: boolean;
  treatmentAssistant2?: string;
  next?: string;
  topicalAnesthetic?: boolean;
  firstAnesthetic?: string;
  firstAnestheticCarpules?: string;
  secondAnesthetic?: string;
  secondAnestheticCarpules?: string;
  n2o?: boolean;
  n2oPercent?: string;
  n2oMin?: string;
  o2Fluse?: boolean;
  o2Min?: string;
  psa?: boolean;
  msa?: boolean;
  asa?: boolean;
  ia?: boolean;
  lb?: boolean;
  pal?: boolean;
  infiltrate?: boolean;
  fillingList?: Filling[];
  postOpBp?: string;
  treatmentNotes?: string;
}
