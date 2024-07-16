import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-daily-report',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './daily-report.component.html',
  styleUrl: './daily-report.component.css'
})
export class DailyReportComponent {
  reportForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      patientName: ['', Validators.required],
      date: [new Date(), Validators.required],
      symptoms: ['', Validators.required],
      diagnosis: ['', Validators.required],
      treatment: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.reportForm.valid) {
      console.log(this.reportForm.value);
      this.reportForm.reset();
    } else {
      console.error('Form validation failed');
    }
  }
}