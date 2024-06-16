import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-symptoms',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './symptoms.component.html',
  styleUrl: './symptoms.component.css'
})
export class SymptomsComponent {
  symptomsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.symptomsForm = this.formBuilder.group({
      doctor: ['', Validators.required],
      symptoms: ['', [Validators.required, Validators.minLength(10)]],
      issue: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.symptomsForm.valid) {
      console.log('Form Submitted', this.symptomsForm.value);
    }
  }
}