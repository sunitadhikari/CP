import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SymptomsService } from '../../../core/service/symptoms/symptoms.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-symptoms',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './symptoms.component.html',
  styleUrl: './symptoms.component.css'
})
export class SymptomsComponent implements OnInit{
  symptomsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private symptpmsService : SymptomsService) {
 
  }
ngOnInit(): void {
  this.symptomsForm = this.formBuilder.group({
    doctor: ['', Validators.required],
    symptoms: ['', [Validators.required, Validators.minLength(10)]],
    issue: ['', [Validators.required, Validators.minLength(10)]]
  });
}
  onSubmit() {
    console.log('form correct');
    if (this.symptomsForm.valid) {
      this.symptpmsService.postSymptoms(this.symptomsForm.value).subscribe((data)=>{
        console.log('form valid');
      })
      alertify.success('Success')
    }
    else{
      alertify.error('Error to submit.')
    }
  }
}