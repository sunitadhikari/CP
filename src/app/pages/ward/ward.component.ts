import { Component, OnInit } from '@angular/core';
import { WardService } from '../../core/service/ward-service/ward.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-ward',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NgxPaginationModule],
  templateUrl: './ward.component.html',
  styleUrl: './ward.component.css'
})
export class WardComponent implements OnInit {
  wards: any[] = [];
  newWard: any = {
    wardType: '',
    capacity: 0
  };
  editWard: any = null;
  isLoading = false;
  error = '';
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;


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

  onPageChange(page: number) {
    this.page = page;
    this.loadWards();
  }
  addWard() {
    this.isLoading = true;
    this.wardService.createWard(this.newWard).subscribe(
      (data) => {
        this.wards.push(data);
        this.newWard = {
          wardType: '',
          capacity: 0
        };
        alertify.success('Ward already exits')

        this.isLoading = false;
      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }
  // addWard() {
  //   this.isLoading = true;
  
  //   // Create a new ward object with lowercase wardType
  //   const newWard = {
  //     wardType: this.newWard.wardType.toLowerCase(),
  //     capacity: this.newWard.capacity
  //   };
  
  //   this.wardService.createWard(newWard).subscribe(
  //     (data) => {
  //       // Add the new ward to the wards array
  //       this.wards.push(data);
  
  //       // Reset the newWard object
  //       this.newWard = {
  //         wardType: '',
  //         capacity: 0
  //       };
  
  //       // Set isLoading to false after successful creation
  //       this.isLoading = false;
  
  //       // Display a success message
  //       alertify.success('Ward created successfully');
  //     },
  //     (error) => {
  //       // Handle error
  //       this.error = error.message;
  //       this.isLoading = false;
  
  //       // Display an error message
  //       alertify.error('Failed to create ward');
  //     }
  //   );
  // }
  editWardMode(ward: any) {
    this.editWard = { ...ward };
  }

  updateWard() {
    this.isLoading = true;
    this.wardService.updateWard(this.editWard._id, this.editWard).subscribe(
      (data) => {
        const index = this.wards.findIndex((w) => w._id === data._id);
        this.wards[index] = data;
        this.editWard = null;
        this.isLoading = false;
      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }

  deleteWard(ward: any) {
    this.isLoading = true;
    this.wardService.deleteWard(ward._id).subscribe(
      () => {
        this.wards = this.wards.filter((w) => w._id !== ward._id);
        this.isLoading = false;
      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
      }
    );
  }
}