import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LocalStoreService } from './local-store.service';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    constructor(private auth: AuthService, private router: Router, private localStore: LocalStoreService) { }

    showAlert(icon: 'success' | 'error' | 'info', message: string) {
        Swal.fire({
            position: 'top-right',
            icon,
            title: message,
            showConfirmButton: false,
            showCloseButton: true,
            timer: 1000,
            toast: true,
        })
    }

    handleError(error: any) {
          if (error && error.status) {
            if (error.status === 504) {
                Swal.fire({
                    title: `Error ${error?.status}: ${error?.error?.error ? error?.error.error : 'An error occured.'}` ,
                    icon: 'error',
                });
                this.localStore.clear('session');
                this.router.navigate(['/auth/login']);
            } else if(error.status === 403 || error.status === 401) {
                this.localStore.clear('session');
                this.router.navigate(['/auth/login']);
            } else if(error.status === 413) {
              Swal.fire({
                title: `Error: ${error.status}`,
                text: 'Request Entity Too Large',
                icon: 'error',
              });
            } else if(error.status === 404 || error.status === 400) {

            } else {
                Swal.fire({
                    title: `Error: ${error.status}`,
                    text: error.error?.error,
                    icon: 'error',
                });
            }
            return throwError(error.error?.error ?? error?.error?.message);
        } else {
            Swal.fire({
                title: `Error: ${error.status}`,
                text: error.error?.error,
                icon: 'error',
            });
            return throwError(`${error.status}: ${error.error}`);
        }
    }
}
