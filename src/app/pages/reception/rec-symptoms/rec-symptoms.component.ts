import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SymptomsService } from '../../../core/service/symptoms/symptoms.service';
import { UserService } from '../../../core/service/user/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-rec-symptoms',
  standalone: true,
  imports: [CommonModule,FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './rec-symptoms.component.html',
  styleUrl: './rec-symptoms.component.css'
})
export class RecSymptomsComponent implements OnInit {
  symptomsData: any[] = [];
  doctorList: any[] = [];
  modalForm!: FormGroup;
  selectedSymptoms: any;

  constructor(
    private symptomsService: SymptomsService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getSymptoms();
    this.getDoctor();
    this.initModalForm();
  }

  initModalForm(): void {
    this.modalForm = this.formBuilder.group({
      patient: '',
      symptoms: '',
      doctor: ''
    });
  }
  assignDoctor(symptoms:any){}

  getSymptoms(): void {
    this.symptomsService.getSymptoms().subscribe((res) => {
      this.symptomsData = res;
    });
  }

  getDoctor(): void {
    this.userService.getDoctors().subscribe((res) => {
      this.doctorList = res.doctors;
    });
  }

  openModal(symptoms: any): void {
    this.selectedSymptoms = symptoms;
    this.modalForm.patchValue({
      patient: symptoms.patient,
      symptoms: symptoms.symptoms,
      doctor: symptoms.doctor
    });
  }

  onSubmit(): void {
    console.log(this.modalForm.value);
  }
}