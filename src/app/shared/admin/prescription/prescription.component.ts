import { Component } from '@angular/core';
import { SharedTableComponent } from '../../sharedComponent/shared-table/shared-table.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prescription',
  standalone: true,
  imports: [SharedTableComponent,CommonModule],
  templateUrl: './prescription.component.html',
  styleUrl: './prescription.component.css'
})
export class PrescriptionComponent {
  prescriptions: any[] = [];

  constructor(

    private http: HttpClient

  ) {
    this.loadPrescriptions()
  }

  loadPrescriptions(): void {
    this.http.get<any[]>('http://localhost:3000/getprescriptions')
      .subscribe(
        (data) => {
          this.prescriptions  = data;
        },
        (error) => {
          console.error('Error fetching payment data', error);
        }
      );
  }
}