import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, MatIconModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    { title: 'APPOINTMENT MANAGEMENT', description: 'Allow patients to schedule and fix appointments with the available doctors with a single click.', icon: 'fas fa-calendar-alt' },
    { title: 'DOCTOR RECORDS', description: 'Make a complete profile of doctors and manage their availability and schedule their meetings.', icon: ' fas fa-user-md' },
    { title: 'IN-PATIENT MANAGEMENT', description: 'Manage records of in-patients along with their admission details, bed number, diet, payments and case scenario.', icon: 'fas fa-file-invoice-dollar' },
    { title: 'OUTPATIENT MANAGEMENT', description: 'Manage payments, services received, medicines and lab reports of patients who are not admitted to the hospital.', icon: 'fas fa-pills' },
    { title: 'BILLINGS', description: 'Manage all transactions related to payments and invoices.', icon: 'fas fa-chart-line' },
    { title: 'BED MANAGEMENT SYSTEM', description: 'Allocate and ensure a unique bed number for each patient.', icon: 'fas fa-bed' },
    { title: 'LABORATORY MANAGEMENT', description: 'Keep detailed records of the tests performed on each patient.', icon: 'fas fa-flask' },
    { title: 'PRESCRIPTION SYSTEM', description: 'Doctors give prescription to patients.', icon: 'fas fa-prescription-bottle-alt' },
    { title: 'Emergency Services', description: 'Streamline emergency care processes.', icon: 'fas fa-ambulance' }
  ];
}
