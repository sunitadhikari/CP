import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SymptomsService } from '../../../core/service/symptoms/symptoms.service';
import { UserService } from '../../../core/service/user/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as alertify from 'alertifyjs';
import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-rec-symptoms',
  standalone: true,
  imports: [CommonModule,FormsModule,CommonModule,ReactiveFormsModule,NgxPaginationModule],
  templateUrl: './rec-symptoms.component.html',
  styleUrl: './rec-symptoms.component.css'
})
export class RecSymptomsComponent implements OnInit {
  symptomsData: any[] = [];
  doctorList: any[] = [];
  modalForm!: FormGroup;
  selectedSymptoms: any;
  page: number = 1;


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
      //doctor: symptoms.doctor
      doctor: ''
    });
  }

  onSubmit(): void {
    console.log(this.modalForm.value);
  }
  submit(){
    if(this.modalForm.valid){
      //this.symptomsService.postSymptoms(this.modalForm.value).subscribe((data)=>{
        this.symptomsService.assignDoctor(this.selectedSymptoms._id, this.modalForm.value.doctor).subscribe((data)=>{  
        console.log('data',data);
        alertify.success("FORM FILLED SUCCESSFUL"); 
        this.modalForm.reset()
      },
      (error) => {
        alertify.error('Failed to assign doctor.');
        console.log(error);
      })
    }
  
  }
}