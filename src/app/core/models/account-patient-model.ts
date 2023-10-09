import { InsuranceCoverage } from "./insurance-coverage.model";

export class AccountPatient {
  id?: any;
  account_id?: number;
  guarantor_primary?: number;
  guarantor_secondary?: number;
  prefix?: string;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  suffix?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  birth_date?: any;
  gender?: any;
  ssn?: string;
  employment?: string;
  email?: string;
  on_file?: any;
  type?: number;
  phone_numbers?: any;
  insurance_coverages_available?: InsuranceCoverage[] = [];

  constructor(fields?: {
    id?: any, account_id?: number, guarantor_primary?: number, guarantor_secondary?: number, prefix?: string, first_name?: string, last_name?: string, suffix?: string, address?: string, city?: string, state?: string, zip?: string,
    gender?: any, ssn?: string, employment?: string, email?: string, on_file?: any, type?: number, phone_numbers?: any, insurance_coverages_available?: InsuranceCoverage[]
  }) {
    if (fields) Object.assign(this, fields)

    // returns the combined last name, first name
    Object.defineProperty(this, 'name', {
      get() { return `${this.last_name}, ${this.first_name}` }
    });

    // returns the combined first name last name
    Object.defineProperty(this, 'patientName', {
      get() { return `${this.first_name} ${this.last_name}` }
    });

    // returns the city, state, zip
    Object.defineProperty(this, 'patientCityStateZip', {
      get() { return `${this.city}, ${this.state}, ${this.zip}` }
    });

    // returns the date of birth in string - MM/dd/yyyy format
    Object.defineProperty(this, 'dob', {
      get() {
        if (!this.birth_date) return '';

        const bday = new Date(this.birth_date);
        return `${bday.getMonth() + 1}/${bday.getDate()}/${bday.getFullYear()}`;
      }
    });
  }

}
