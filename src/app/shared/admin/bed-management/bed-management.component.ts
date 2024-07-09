import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BedService } from '../../../core/service/bed/bed.service';
import * as alertify from 'alertifyjs';
import { RoomManagementService } from '../../../core/service/room-management/room-management.service';


@Component({
  selector: 'app-bed-management',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './bed-management.component.html',
  styleUrl: './bed-management.component.css'
})
export class BedManagementComponent implements OnInit {
  bedForm!: FormGroup;
  status = ['Active', 'Inactive'];
  bedList: any[] = []
  roomName:any[]=[]

  constructor(private fb: FormBuilder, private bedService: BedService,private roomService: RoomManagementService, ) { }

  ngOnInit() {
    this.bedForm = this.fb.group({
      name: ['', Validators.required],
      bedNumber: ['', Validators.required],
      description: [''],
      bedCapacity: [''], // Will be populated based on selected room
      charge: [''], // Will be populated based on selected room
      status: ['', Validators.required]
    });
    this.roomService.getRoom().subscribe((res)=>{
      console.log(res);
      this.roomName=res
      this.bedForm.get('name')?.valueChanges.subscribe(roomName => {
        const selectedRoom = this.roomName.find(room => room.name === roomName);
        if (selectedRoom) { 
          this.bedForm.patchValue({
            bedCapacity: selectedRoom.bedCapacity,
            charge: selectedRoom.charge
          });
        } else {
          this.bedForm.patchValue({
            bedCapacity: null,
            charge: null
          });
        }
      });
    });
    this.getBed()
    
  }
  onSubmit() {
    if (this.bedForm.valid) {
      
      this.bedService.postBed(this.bedForm.value).subscribe((data) => {
        console.log(data);
        
        alertify.success('Successfully added')
        this.bedForm.reset()
        this.getBed()
      })
    

    }
    else {
      alertify.error('Invalid form');
    }
  }
  getBed() {
    this.bedService.getBed().subscribe((data) => {
      console.log('data');
      this.bedList = data
    })
  }
  editBed() {

  }

  deleteBed(id: number) {
    this.bedService.deleteBed(id).subscribe(() => {
      alertify.success('Successfully deleted');
      this.getBed();
    },
      error => {
        alertify.error('Failed to delete')
      });
  }
  get maxBedNumber(): number {
    const bedCapacity = this.bedForm.get('bedCapacity')?.value;
    return bedCapacity ? bedCapacity : Number.MAX_VALUE;
  }
}