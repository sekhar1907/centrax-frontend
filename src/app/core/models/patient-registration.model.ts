export interface PatientRegistration {
  responsibleParty?: PRResponsibleParty;
  patient?: PRPatient;
  insurances?: PRInsurances;
  dentalHistory?: PRDentalHistory;
  medicalHistory?: PRMedicalHistory;
  medications?: PRMedications[];
}

export interface PRResponsibleParty {
  prefix?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  suffix?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  birth_date?: string;
  gender?: string;
  ssn?: string;
  employment?: string;
  email?: string;
}

export interface PRPatient {
  id?: number;
  prefix?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  suffix?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  birth_date?: string | Date;
  gender?: string;
  ssn?: string;
  email?: string;
}

export interface PRInsurances {
  primaryInsurance?: {
    subscriberPerson?: string;
    insurance_plan_id?: number;
    subscriber_id?: number;
    group_no?: string;
    subscriberPersonData?: {
        prefix?: string;
        first_name?: string;
        middle_name?: string;
        last_name?: string;
        suffix?: string;
        address?: string;
        city?: string;
        state?: string;
        zip?: string;
        birth_date?: string;
        gender?: string;
        ssn?: string;
        email?: string;
        relationToPatient?: string;
    }
  },
  secondaryInsurance?: {
    group_no?: string;
    subscriberPerson?: string;
    insurance_plan_id?: number;
    subscriber_id?: number;
    subscriberPersonData?: {
      prefix?: string;
      first_name?: string;
      middle_name?: string;
      last_name?: string;
      suffix?: string;
      address?: string;
      city?: string;
      state?: string;
      zip?: string;
      birth_date?: string;
      gender?: string;
      ssn?: string;
      email?: string;
      relationToPatient?: string;
  }
  }
}

export interface PRDentalHistory {
  id?: number;
  reason_of_visit?: string;
  dental_provider?: string;
  dateOfLastVisit?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  office_phone?: number;
  bad_breathing?: number;
  bleeding_guns?: number;
  clicking_jaw?: number;
  cold_sores?: number;
  food_collection?: number;
  grinding_teeth?: number;
  loose_teeth?: number;
  periodontal_treatment?: number;
  radiational_treatment?: number;
  sensitivity_to_cold?: number;
  sensitivity_to_heat?: number;
  sensitivity_to_sweets?: number;
  sensitivity_when_biting?: number;
  sores_of_growths_in_mouth?: number;
  surgery_to_mouth_or_gums?: number;
  floss?: string;
  brush?: string;
  serious_complication?: number;
  complication_explain?: string;
  current_dental_health?: number;
}

export interface PRMedicalHistory {
  id?: number;
  primary_care_provider?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  office_phone?: string;
  pregnant_or_nursing?: string;
  use_alcohol?: number;
  alcohol_type?: number;
  hospitalized?: number;
  explanation_of_illness?: string;
  allergic?: number;
  allergic_explanation?: string;
  skin_condition?: number;
  changes_in_skin_color?: number;
  visual_change?: number;
  glaucoma?: number;
  eye_surgery?: number;
  loss_of_hearing?: number;
  tinnitus?: number;
  frequent_nosebleeds?: number;
  sinus_problem?: number;
  hepatities?: number;
  jaundice?: number;
  ulcers?: number;
  heartburn?: number;
  dry_mouth?: number;
  difficulty_swallowing?: number;
  elevated_cholesterol?:  number;
  chest_pain?: number;
  heart_attack?: number;
  shortness_of_breath?:  number;
  stroke?: number;
  swelling_of_ankles?:  number;
  high_blood_pressure?:  number;
  congenital_heart_disease?:  number;
  atrificial_heart_valve?: number;
  pacemaker?: number;
  heart_surgery?: number;
  other?: number;
  tuberculosis?: number;
  difficulty_breathing?: number;
  emphysema?: number;
  asthma?: number;
  presistent_cough?: number;
  kidney_disease?: number;
  increase_urination?: number;
  venereal_disease?: number;
  arthritis?: number;
  artificial_joints?: number;
  back_problems?: number;
  taken_bisphosphonates?: number;
  headaches?: number;
  convulsions?: number;
  numbness?: number;
  dizziness?: number;
  psychiatric_treatement?: number;
  dementia?: number;
  tendency_of_bruise?: number;
  anemia?: number;
  blood_transfusion?: number;
  abnormal_bleeding?: number;
  anticoagulant?: number;
  radiation_therapy?: number;
  tumors?: number;
  cancer?: number;
  immune_suppression_disorder?: number;
  note?: string;
  sign?: string;
  date?: string;
}

export interface PRMedications {
  id?: number;
  medication?: string;
  reason?: string;
}
