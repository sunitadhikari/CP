import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LabTechService } from '../../../../core/service/lab-tech/lab-tech.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lab.component.html',
  styleUrl: './lab.component.css'
})
export class LabComponent implements OnInit {
  labForm!: FormGroup
  labList: any[] = []
  constructor(private fb: FormBuilder, private labService: LabTechService) { }

  ngOnInit(): void {
    this.labForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: [''],
      mobileNo: ['', Validators.required],
      dob: [''],
      sex: ['', Validators.required],
      bloodGroup: [''],
      status: ['active', Validators.required]
    })
    this.labTable()
  }
  labTable(){
    this.labService.getLab().subscribe((data)=>{
      console.log(data);
      this.labList = data
    })
    
  }
  submit() {
    // console.log(this.labForm.value);
    if (this.labForm.valid) {
      this.labService.postLab(this.labForm.value).subscribe((data) => {
        console.log(data);
      })
      alertify.success('Form Valid')
      this.labForm.reset()
    }
    else {
      alertify.error('Form is not valid.')
    }
  }
}
