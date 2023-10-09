import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

// create an instance of MatSnackBar
  constructor(private messageService: MessageService) { }
    /**
     * open a snackbar for error or success feedback
     *
     * @param message - the message string
     * @param action - label for snackbar action
     * @param snackBarClass - the type of snackbar css to apply, currently we have - error and success
    */
  // openSnackBar(message: string, action: string, snackBarClass: string) {
  //   this.snackBar.open(message, action, {
  //      duration: 3000,
  //      horizontalPosition: 'end',
  //      panelClass: [`${snackBarClass}-snackbar`]
  //   });
  // }
}
