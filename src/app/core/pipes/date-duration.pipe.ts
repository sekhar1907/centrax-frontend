import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateDuration'
})
export class DateDurationPipe implements PipeTransform {
  transform(startDate: Date, endDate: Date): string {
    const momentDate1 = moment(startDate);
    const momentDate2 = moment(endDate);

    const duration = moment.duration(momentDate2.diff(momentDate1));
    return `${duration.asMinutes()} min`;
  }
}
