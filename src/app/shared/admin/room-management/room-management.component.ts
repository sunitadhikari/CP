import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './room-management.component.html',
  styleUrl: './room-management.component.css'
})
export class RoomManagementComponent implements OnInit {
  roomForm!: FormGroup;
  rooms: Room[] = [];
  statuses = ['Active', 'Inactive'];
  editingRoomId: number | null = null;
  constructor(private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      bedCapacity: [1, [Validators.required, Validators.min(1)]],
      charge: [0, [Validators.required, Validators.min(0)]],
      status: ['Active', Validators.required]
    });

    this.rooms = [
      { id: 1, name: '0', description: '', bedCapacity: 1, charge: 1.00, status: 'Active' },
      { id: 2, name: '1001', description: 'ICU', bedCapacity: 20, charge: 16000.00, status: 'Active' },
      { id: 3, name: '101', description: 'General Ward', bedCapacity: 2147483647, charge: 40.00, status: 'Active' },
      
    ];
  }

  onSubmit(): void {
    if (this.roomForm.invalid) {
      return;
    }

    const roomData = this.roomForm.value;
    if (this.editingRoomId !== null) {
      const index = this.rooms.findIndex(room => room.id === this.editingRoomId);
      this.rooms[index] = { ...roomData, id: this.editingRoomId };
      this.editingRoomId = null;
    } else {
      const newRoom: Room = { ...roomData, id: this.rooms.length + 1 };
      this.rooms.push(newRoom);
    }

    this.roomForm.reset({ status: 'Active' });
  }

  editRoom(room: Room): void {
    this.roomForm.patchValue(room);
    this.editingRoomId = room.id;
  }

  deleteRoom(roomId: number): void {
    this.rooms = this.rooms.filter(room => room.id !== roomId);
  }
}
