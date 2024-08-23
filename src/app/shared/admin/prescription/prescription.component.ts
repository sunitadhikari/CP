import { Component } from '@angular/core';
import { SharedTableComponent } from '../../sharedComponent/shared-table/shared-table.component';

@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './prescription.component.html',
  styleUrl: './prescription.component.css'
})
export class PrescriptionComponent {
  tableColumns = [
    { field: 'id', header: 'ID' },
    { field: 'patient', header: 'Patient' },
    { field: 'date', header: 'Date' },
    { field: 'prescription', header: 'Prescription' }
  ];

  prescriptions = [
   
  ];

  actions = [
    { label: 'Edit', action: this.editPrescription },
    { label: 'Delete', action: this.deletePrescription }
  ];

  editPrescription(prescription: any) {
    console.log('Editing prescription', prescription);
  }

  deletePrescription(prescription: any) {
    console.log('Deleting prescription', prescription);
  }
}