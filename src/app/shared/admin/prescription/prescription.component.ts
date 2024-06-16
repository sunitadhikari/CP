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
    { id: 1, patient: 'John Doe', date: '2024-06-01', prescription: 'Take 1 tablet daily' },
    { id: 2, patient: 'Jane Smith', date: '2024-06-02', prescription: 'Apply ointment twice a day' }
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