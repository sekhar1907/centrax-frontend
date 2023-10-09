import { Component } from '@angular/core';
import { PracticeManagerService } from 'src/app/core/services/practice-manager.service';
import { Router } from '@angular/router';
import Papa from 'papaparse';
import Swal from 'sweetalert2';
import { FeeSchedule } from 'src/app/core/models/practice-manager.model';

@Component({
  selector: 'app-fee-schedule-dental',
  templateUrl: './fee-schedule-dental.component.html',
  styleUrls: ['./fee-schedule-dental.component.scss'],
})
export class FeeScheduleDentalComponent {
  urlfile: any = '';
  files: File[] = [];
  parsedFeeSchedules: FeeSchedule[] = [];

  constructor(
    private PracticeManagerService: PracticeManagerService,
    private router: Router
  ) {}

  onSelect(event: any) {
    const files: File[] = event.addedFiles || event.target.images;
    const columnNames = ['feeScheduleType', 'procedureId', 'amount']
    Papa.parse(files[0], {
      header: false,
      complete: (results) => {
        this.parsedFeeSchedules = results?.data?.reduce((rows, row) => {
          if(this.checkEmptyStrings(row)) return rows;
          let feeSched = {};
          columnNames.forEach((column, index) => {
            feeSched[column] = row[index]
          });
          return [...rows, feeSched]
        }, [])
      },
      error: () => {
        Swal.fire({title: 'Failed to read csv file', icon: 'error'});
      }
    });
    this.files.push(...files);
  }

  private checkEmptyStrings(array) {
    return array.every((element) => {
      return typeof element === 'string' && element.trim() === '';
    });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onCreateFeeSchedules() {
    this.PracticeManagerService.createFeeScheduleList(
      this.parsedFeeSchedules
    ).subscribe({
      next: (res) => {
        this.router.navigate(['/practice-manager/collection-messages-insurance'])
      },
      error: (error) => {
        console.log(error);
        Swal.fire({title: 'Failed to import fee schedule data', icon: 'error'});
      },
    });
  }
}
