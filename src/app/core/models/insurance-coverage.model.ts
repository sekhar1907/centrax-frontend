import { AccountPatient } from "./account-patient-model";
import { InsurancePlan, InsuranceCompany } from "./insurance-plan.model";

export class InsuranceCoverage {
  id?: number;
  insurance_plan_id: number;
  subscriber_person_id: number;
  subscriber_id: number | string;
  insurancePlan?: InsurancePlan;
  subscriberPerson?: AccountPatient;
  insuranceCompany?: InsuranceCompany;
  disabled?: boolean = false;

  constructor(fields?: {
    id?: number, insurance_plan_id: number, subscriber_person_id: number, subscriber_id: number | string,
    insurancePlan?: InsurancePlan, subscriberPerson?: AccountPatient, insuranceCompany?: InsuranceCompany, disabled?: boolean
  }) {
    if (fields) Object.assign(this, fields)

  }
}
