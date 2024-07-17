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
  prescriptions: any[] = [];
  filteredPrescriptions: any[] = [];
  currentPage: number = 1;
  selectedPrescription: any = null;
  itemsPerPage: number = 10;
  searchText: string = '';

  constructor(private prescriptionsService: PrescriptionService) {}

  ngOnInit(): void {
    this.prescriptionsService.getpresByEmail().subscribe(data => {
      this.prescriptions = data;  this.filteredPrescriptions = data;
    });
  }
  selectPrescription(prescription: any): void {
    this.selectedPrescription = prescription;
  }
  onSearchChange(): void {
    this.filteredPrescriptions = this.prescriptions.filter(prescription => 
      prescription.prescription.toLowerCase().includes(this.searchText.toLowerCase()) ||
      prescription.dosage.toLowerCase().includes(this.searchText.toLowerCase()) ||
      prescription.instructions.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}