import { Injectable } from '@angular/core';
// declare let alertify: any;
import * as alertify from 'alertifyjs';


@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  showConfirmationPopup(): Promise<boolean> {
    return new Promise((resolve) => {
      alertify.confirm('Confirmation', 'Are you sure you want to Delete?', () => {
        resolve(true);
      }, () => {
        resolve(false);
      });
    });
  }
  showSuccessMessage(message: string): void {
    alertify.success(message);
  }

  showErrorMessage(message: string): void {
    alertify.error(message);
  }
}