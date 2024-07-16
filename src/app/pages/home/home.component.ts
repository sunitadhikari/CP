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
    { title: 'Patient Management', description: 'Manage patient information efficiently.', logo: 'assets/patient-management.png' },
    { title: 'Doctor Scheduling', description: 'Automate doctor appointments.', logo: 'assets/doctor-scheduling.png' },
    { title: 'Billing System', description: 'Manage patient invoices and payments.', logo: 'assets/billing-system.png' },
    { title: 'Inventory Management', description: 'Track hospital inventory.', logo: 'assets/inventory-management.png' },
    { title: 'Reports & Analytics', description: 'Generate comprehensive reports.', logo: 'assets/reports-analytics.png' },
    { title: 'Emergency Services', description: 'Streamline emergency care processes.', logo: 'assets/emergency-services.png' }
  ];
}
