import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../../core/service/prescription-Service/prescription.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-medical-pescribe',
  standalone: true,
  imports: [CommonModule,NgxPaginationModule,FormsModule],
  templateUrl: './medical-pescribe.component.html',
  styleUrl: './medical-pescribe.component.css'
})
export class MedicalPescribeComponent implements OnInit {
  opdReports: any[] = [];
  filteredPrescriptions: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  prescriptions: any[] = [];
  itemsPerPage: number = 10;
  selectedPrescription: any = null;

  constructor(private prescriptionsService: PrescriptionService) {
    this.prescriptionsService.getOpdReports().subscribe((data) => {
      this.opdReports = data;
      this.filteredPrescriptions = data;
    });
  }

  ngOnInit(): void {
    this.prescriptionsService.getpresByEmail().subscribe(data => {
      this.prescriptions = data;  
    });

  }
  selectPrescription(prescription: any): void {
    this.selectedPrescription = prescription;
  }
  filterReports(): void {
    this.filteredPrescriptions = this.opdReports.filter(report => {
      const searchStr = this.searchTerm.toLowerCase();
      return (
        report.email.toLowerCase().includes(searchStr) ||
        report.departmentName.toLowerCase().includes(searchStr) ||
        report.doctorname.toLowerCase().includes(searchStr) ||
        new Date(report.date).toLocaleDateString().toLowerCase().includes(searchStr) ||
        report.phone.toLowerCase().includes(searchStr) ||
        report.problem.toLowerCase().includes(searchStr) ||
        report.prescriptions.some((prescription: any) =>
          prescription.prescription.toLowerCase().includes(searchStr) ||
          prescription.dosage.toLowerCase().includes(searchStr) ||
          prescription.instructions.toLowerCase().includes(searchStr)
        )
      );
    });
  }
}