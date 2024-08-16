import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomManagementService } from '../../../core/service/room-management/room-management.service';
import * as alertify from 'alertifyjs';



interface Room {
  id: number;
  name: string;
  description: string;
  bedCapacity: number;
  charge: number;
  status: string;
}
@Component({
  selector: 'app-room-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room-management.component.html',
  styleUrl: './room-management.component.css'
})
export class RoomManagementComponent implements OnInit {
  roomForm!: FormGroup;
  rooms: Room[] = [];
  statuses = ['Available', 'Occupied', 'Maintenance'];
  editingRoomId: number | null = null;
  constructor(private formBuilder: FormBuilder, private roomService: RoomManagementService) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      bedCapacity: [1, [Validators.required, Validators.min(1)]],
      charge: [, [Validators.required, Validators.min(0)]],
      status: ['Available', Validators.required]
    });
    this.getRoom()
  }

  onSubmit() {

    if (this.roomForm.valid) {
      this.roomService.postRoomManage(this.roomForm.value).subscribe((data) => {
        console.log(data);
      })
      alertify.success('Successfully Added')
      this.roomForm.reset()
      this.getRoom()

    }
    else {
      alertify.error('Failed to Add')
      this.getRoom()

    }
  }

  getRoom() {
    this.roomService.getRoom().subscribe((data) => {
      this.rooms = data;
      console.log(this.rooms);
    })
  }
}
