import * as moment from "moment";

export function formatDate(date: string) {
  return date ? moment(date).format('L') : null;
}

export function removeEmptyFormArrays(formValue: any, formArrayFieldNames: string[]): any {
  const updatedFormValue = { ...formValue };

  for (const formArrayFieldName of formArrayFieldNames) {
    const formArray = updatedFormValue[formArrayFieldName] as any[];
    const filteredFormArray = formArray.filter((formGroup) => {
      return Object.values(formGroup).some((value) => value !== null);
    });

    updatedFormValue[formArrayFieldName] = filteredFormArray;
  }

  return updatedFormValue;
}

export function parseFormArrays(formValue: any, formArrayFieldNames: string[]): any {
  const updatedFormValue = { ...formValue };

  for (const formArrayFieldName of formArrayFieldNames) {
    const formArray = updatedFormValue[formArrayFieldName] as string;
    updatedFormValue[formArrayFieldName] = formArray && JSON.parse(formArray);
  }

  return updatedFormValue;
}


export function removeNullAndEmptyValues(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => removeNullAndEmptyValues(item)).filter(Boolean);
  }

  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = removeNullAndEmptyValues(obj[key]);
      if (value !== null && value !== '') {
        result[key] = value;
      }
    }
  }

  return result;
}

export function getMinutesDifference(date1: Date, date2: Date): number {
  const momentDate1 = moment(date1);
  const momentDate2 = moment(date2);

  // Calculate the difference in minutes
  const diffMinutes = momentDate2.diff(momentDate1, 'minutes');

  return diffMinutes;
}

export function setToMidnight(date: Date): Date {
  date.setHours(23, 59, 59, 999);
  return date;
}
