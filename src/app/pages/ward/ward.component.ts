import { Component, OnInit } from '@angular/core';
import { WardService } from '../../core/service/ward-service/ward.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ward',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './ward.component.html',
  styleUrl: './ward.component.css'
})
export class WardComponent implements OnInit {
  wards: any[] = [];
  newWard: any = {
    // wardName: '',
    wardType: '',
    capacity: 0,
    // currentOccupancy: 0
  };
  isLoading = false;
  error = '';

  constructor(private wardService: WardService) { }

  ngOnInit(): void {
    this.loadWards();
  }

  loadWards() {
    this.isLoading = true;
    this.wardService.getAllWards().subscribe(
      (data) => {
        this.wards = data;
        this.isLoading = false;
      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }

  addWard() {
    this.isLoading = true;
    this.wardService.createWard(this.newWard).subscribe(
      (data) => {
        this.wards.push(data);
        this.newWard = {
          wardName: '',
          wardType: '',
          capacity: 0,
          currentOccupancy: 0
        };
        this.isLoading = false;
      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }
}