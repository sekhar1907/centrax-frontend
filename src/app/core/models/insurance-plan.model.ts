import { AccountPatient } from "./account-patient-model";
import { InsuranceCoverage } from "./insurance-coverage.model";

export interface InsuranceCompany {
  id: number;
  company_id: string;
  company_name: string;
  slug: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  website: string;
  zipext?: string;
  contact_person: string;
}

export interface Employer {
  id: number;
  name: string;
  employer_name: string;
  address?: string;
  city: string;
  state: string;
  zip: string;
  contact_number: string;
  phone_number: string;
  phone_number_ext: string;
  contact_number_type: number;
  phone_type: number;
  fax: string;
  fax_ext: string;
  email: string;
  website: string;
}

export class InsurancePlan {
  id?: number;
  plan_name?: string;
  // subs?: string;
  // subs_id?: string;
  group_no?: string | number;
  ins_type?: number;
  reset_benefits_by?: number;
  insurance_company: InsuranceCompany;
  employer: Employer;
  type?: string;

  constructor(fields?: {
    id?: number, plan_name?: string, group_no?: string | number, ins_type?: number, insurance_company: InsuranceCompany, employer: Employer, type?: string
  }) {
    if (fields) Object.assign(this, fields)

    Object.defineProperty(this, 'company_id', {
      get() { return this.insurance_company?.company_id; }
    });

    Object.defineProperty(this, 'company_name', {
      get() { return this.insurance_company?.company_name; }
    });

    Object.defineProperty(this, 'company_address', {
      get() { return `${this.insurance_company?.address1} ${this.insurance_company?.address2}`; }
    });

    Object.defineProperty(this, 'company_city', {
      get() { return this.insurance_company?.city; }
    });

    Object.defineProperty(this, 'company_state', {
      get() { return this.insurance_company?.state; }
    });

    Object.defineProperty(this, 'company_zip', {
      get() { return this.insurance_company?.zip; }
    });

    Object.defineProperty(this, 'employer_name', {
      get() { return this.employer?.name; }
    });
  }
}

export class Insurance {
  id?: number;
  plan_name?: string;
  group_no?: string | number;
  ins_type?: number;
  insuranceCompany: InsuranceCompany;
  insuranceCoverage?: InsuranceCoverage;
  insurancePlan?: InsurancePlan;
  employer: Employer;
  subscriberPerson?: AccountPatient;
  type?: string;
  insurance_coverage_id?: number;
  patient_id?: number;
  patient_relation_cd?: string;
  status?: number | string;

  constructor(fields?: {
    id?: number, plan_name?: string, group_no?: string | number, ins_type?: number, insuranceCoverage?: InsuranceCoverage,
    insuranceCompany: InsuranceCompany, employer: Employer, subscriberPerson?: AccountPatient, insurancePlan?: InsurancePlan,
    type?: string, insurance_coverage_id?: number, patient_id?: number, patient_relation_cd?: string, status?: number | string
  }) {
    if (fields) Object.assign(this, fields)

    Object.defineProperty(this, 'company_id', {
      get() { return this.insuranceCompany?.company_id; }
    });

    Object.defineProperty(this, 'company_name', {
      get() { return this.insuranceCompany?.company_name; }
    });

    Object.defineProperty(this, 'company_address', {
      get() { return `${this.insuranceCompany?.address1} ${this.insuranceCompany?.address2}`; }
    });

    Object.defineProperty(this, 'company_city', {
      get() { return this.insuranceCompany?.city; }
    });

    Object.defineProperty(this, 'company_state', {
      get() { return this.insuranceCompany?.state; }
    });

    Object.defineProperty(this, 'company_zip', {
      get() { return this.insuranceCompany?.zip; }
    });

    Object.defineProperty(this, 'company_complete_address', {
      get() { return `${this.insuranceCompany?.address1}, ${this.insuranceCompany?.city}, ${this.insuranceCompany?.state}, ${this.insuranceCompany?.zip}`; }
    });

    Object.defineProperty(this, 'employer_name', {
      get() { return this.employer?.name; }
    });

    Object.defineProperty(this, 'plan_name', {
      get() { return this.insurancePlan?.plan_name; }
    });

    Object.defineProperty(this, 'subscriber_name', {
      get() { return `${this.subscriberPerson?.first_name} ${this.subscriberPerson?.last_name}`;}
    });

    Object.defineProperty(this, 'subscriber_id', {
      get() { return this.subscriberPerson?.id; }
    });

    Object.defineProperty(this, 'group_no', {
      get() { return this.insurancePlan?.group_no; }
    });
  }
}
