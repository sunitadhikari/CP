import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BedService } from '../../../core/service/bed/bed.service';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-bed-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bed-management.component.html',
  styleUrl: './bed-management.component.css'
})
export class BedManagementComponent implements OnInit {
  bedForm!: FormGroup;
  statuses = ['Active', 'Inactive'];
  bedList :any[]=[]

  constructor(private fb: FormBuilder, private bedService: BedService) { }

  ngOnInit() {
    this.bedForm = this.fb.group({
      name: ['', Validators.required],
      bedNumber: ['', Validators.required],
      bedCapacity: ['', Validators.required],
      description: ['', Validators.required],
      charge: ['', Validators.required],
      status: ['Active', Validators.required]
    });
    this.getBed()
  }

  onSubmit() {
    if (this.bedForm.valid) {
      this.bedService.postBed(this.bedForm.value).subscribe((data) => {
        console.log(data);
      })
      alertify.success('Successfully added')
      this.bedForm.reset()
    }
    else {
      alertify.error('Invalid form');
    }
  }
  getBed(){
    this.bedService.getBed().subscribe((data)=>{
      console.log('data');
this.bedList =data
    })
  }
  editBed(){

  }

  deleteBed(){

  }
}