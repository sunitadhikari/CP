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
  editWard: any = null;
  isLoading = false;
  error = '';
  page = 1;
  itemsPerPage = 10;
  totalItems = 0;


  constructor(private wardService: WardService, private fb:FormBuilder, private confirmationService: ConfirmationService) { }

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
  // addWard() {
  //   this.isLoading = true;
  //   this.wardService.createWard(this.newWard).subscribe(
  //     (data) => {
  //       this.wards.push(data);
  //       this.newWard = {
  //         wardType: '',
  //         capacity: 0
  //       };
  //       alertify.success('Ward already exits')

  //       this.isLoading = false;
  //       this.loadWards();

  //     },
  //     (error) => {
  //       this.error = error.message;
  //       this.isLoading = false;
  //       this.loadWards();

  //     }
  //   );
  // }
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
        this.loadWards();

      },
      (error) => {
        this.error = error.message;
        this.isLoading = false;
        this.loadWards();

      }
    );
  }

//  async deleteWard(ward: any) {
//     this.isLoading = true;
//     this.wardService.deleteWard(ward._id).subscribe(
//       () => {
//         this.wards = this.wards.filter((w) => w._id !== ward._id);
//         this.isLoading = false;
//         this.loadWards();

//       },
//       (error) => {
//         this.error = error.message;
//         this.isLoading = false;
//         this.loadWards();

//       }
//     );
//   }
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