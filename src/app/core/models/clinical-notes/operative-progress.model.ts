
export interface OPNitrousSedation {
  time: string;
  percentage: string;
}

export interface OPBuildUp {
  toothNumber: string;
  type: string;
  materialUsed: string;
  postSize: string;
  postSizeMm: string;
}

export interface OPCrownBridgePreparation {
  tooth: string;
  restorationType: string;
  temporaryType: string;
  temporaryCement: string;
  shade: string;
  diagnosis: string;
}

export interface OPCrownBridgeSeat {
  tooth: string;
  restorationType: string;
  cementedWith: string;
}

export interface OPExtraction {
  toothNumber: string;
  buildUpType: string;
  materialUsed: string;
  diagnosis: string;
}

export interface OPImplantCrownBridgePreparation {
  tooth: string;
  restorationType: string;
  implantBrand: string;
  implantSize: string;
  shade: string;
}

export interface OPImplantCrownBridgeSeat {
  tooth: string;
  restorationType: string;
  cementedWith: string;
  implantBrand: string;
  implantSize: string;
  torque: string;
}

export interface OPFillings {
  toothNumber: string;
  surfaces: string;
  restorationType: string;
  shade: string;
  etchPercentage35: boolean;
  vitrabondBase: boolean;
  optibondAdhesive: boolean;
  recordWithEpi: boolean;
}

export interface CreateOperativeDto {
  treatmentProvider: string;
  treatmentAssistant: string;
  medicalHxReviewed?: boolean;
  parq?: boolean;
  preBp?: string;
  postBp?: string;
  nitrousOxideRatio?: string;
  nitrousOxideMin?: string;
  o2Fluse?: boolean;
  o2Min?: string;
  topicalAnesthetic?: boolean;
  firstAnesthetic?: string;
  firstAnestheticCarpules?: string;
  secondAnesthetic?: string;
  secondAnestheticCarpules?: string;
  psa?: boolean;
  msa?: boolean;
  asa?: boolean;
  ia?: boolean;
  lb?: boolean;
  infiltrate?: boolean;
  mental?: boolean;
  treatmentNotes?: string;
  next?: string;
  nitrousSedationList?: OPNitrousSedation[];
  nitrousSedationFlush: boolean;
  nitrousSedationMinutes: string;
  nitrousSedationNotes: string;
  buildUpList: OPBuildUp[];
  buildUpUltraEtch?: boolean;
  buildUpOptibondAd?: boolean;
  buildUpTreatmentNotes?: string;
  bridgePrepList?: OPCrownBridgePreparation[];
  bridgePrepRetractionCordType?: string;
  bridgePrepOpposingModel?: string;
  bridgePrepFinalImpressionMaterial?: string;
  bridgePrepBiteRegistration?: boolean;
  bridgePrepLab?: string;
  bridgePrepTreatmentNotes?: string;
  bridgeSeatList?: OPCrownBridgeSeat[];
  bridgeSeatTreatmentNotes?: string;
  extractionList?: OPExtraction[];
  extractionPostOpInstructionGiven?: string;
  extractionTreatmentNotes?: string;
  implantBridgePrepList?: OPImplantCrownBridgePreparation[];
  implantBridgePrepRetractionCordType?: string;
  implantBridgePrepOpposingModel?: string;
  implantBridgePrepBiteRegistration?: string;
  implantBridgePrepLab?: string;
  implantBridgePrepFinalImpMaterial?: boolean;
  implantBridgePrepTreatmentNotes?: string;
  implantBridgeSeatList?: OPImplantCrownBridgeSeat[];
  implantBridgeSeatLab?: string;
  implantBridgeSeatTreatmentNotes?: string;
  fillingsList?: OPFillings[];
  fillingsTreatmentNotes?: string;
}
