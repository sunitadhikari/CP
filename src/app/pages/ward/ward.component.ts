import { Component, OnInit } from '@angular/core';
import { WardService } from '../../core/service/ward-service/ward.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import * as alertify from 'alertifyjs';
import { ConfirmationService } from '../../shared/confirmation/confirmation.service';

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
  editWard: any;
  isLoading = false;
  error = '';
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;
  capacityInvalid = false;


  constructor(private wardService: WardService, private fb:FormBuilder, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.loadWards();
  }
  onCapacityChange() {
    this.capacityInvalid = this.newWard.capacity < 0 || this.editWard?.capacity < 0;
  }

loadWards() {
  this.isLoading = true;
  try {
    this.wardService.getAllWards().subscribe(
      (data) => {
        console.log('Wards Data:', data);
        this.wards = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error loading wards:', error);
        this.error = error.message;
        this.isLoading = false;
      }
    );
  } catch (error) {
    console.error('Error in loadWards:', error);
    this.error = 'An unexpected error occurred while loading wards.';
    this.isLoading = false;
  }
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
        this.newWard = { wardType: '', capacity: 0 };
        alertify.success('Ward added successfully');
        this.loadWards();
      },
      (error) => {
        this.isLoading = false;
        this.error = error.error.message || 'An error occurred while adding the ward.';
        if (this.error.includes('Ward type already exists')) {
         alertify.error('Ward type already exists');
        } else {
         alertify.error(this.error);
        }
        this.loadWards();
      }
    );
  }
  
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
        this.loadWards();

      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
        this.loadWards();

      }
    );
  }


async deleteWard(id: string) {
  console.log('Deleting ward with ID:', id); // Log ID
  const confirmed = await this.confirmationService.showConfirmationPopup();
  if (confirmed) {
    this.wardService.deleteWard(id).subscribe(

      (res) => {
        
        this.confirmationService.showSuccessMessage('Delete Successfully');
        this.loadWards();
      },
      (error) => {
        
        this.confirmationService.showErrorMessage('Sorry, cannot be deleted');
        this.loadWards();
      }
    );
    
  } else {
    
    this.confirmationService.showErrorMessage('Delete operation cancelled');
  }
}


}