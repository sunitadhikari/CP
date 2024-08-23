import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import * as alertify from 'alertifyjs';
import { DepartmentService } from '../../../core/service/admin/department.service';
import { DoctorService } from '../../../core/service/admin/doctor.service';
import KhaltiCheckout from "khalti-checkout-web";
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { PrescriptionService } from '../../../core/service/prescription-Service/prescription.service';
import { ConfirmationService } from '../../confirmation/confirmation.service';
import { ScheduleService } from '../../../core/service/admin/schedule.service';
@Component({
  selector: 'app-appointment',
  standalone: true,
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  imports: [CommonModule, NgIf, ReactiveFormsModule, FormsModule,  NgxPaginationModule]
})
export class AppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  prescriptionForm!: FormGroup;
  appointmentTable: any[] = [];
  departmentNameList: any[] = [];
  getAppointmentByEmailList: any[] = [];
  doctorName: any[] = [];
  filteredDoctors: any[] = [];
  appointmentAdmin:any[]=[];
  page: number = 1;
  tomorrow: string;
  userRole: string | null | undefined;
  isModalOpen = false;
  selectedAppointment: any;
  prescriptionData: any = null;
  isUpdating: boolean = false;
  modalTitle = '';
  modalMode: 'view' | 'prescribe' = 'view';
  prescription: any; // Variable to hold prescription data
  opdReports: any[] = [];
  opdReportsinDoctor: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  p: number = 1;
  
  editingAppointmentId: string | null = null;


  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private appointmentService: AppointmentService,
    private departmentService: DepartmentService,
    private prescriptionService: PrescriptionService,
    private doctorService: DoctorService,
    private confirmationService: ConfirmationService,
    private scheduleService:ScheduleService

  ) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrow = tomorrow.toISOString().split('T')[0];
    this.departmentService.getDepartment().subscribe((res) => {
      this.departmentNameList = res.departments;
    });
    this.doctorService.getDoctor().subscribe((res) => {
      this.doctorName = res.doctors;

    });
    this.appointmentService.getAppointmentsByDoctorEmail().subscribe((res) => {
      this.getAppointmentByEmailList = res.appointmentwithName;
    });
  }
  ngOnInit(): void {
    
    this.userRole = localStorage.getItem('userRole');
    this.appointmentForm = this.fb.group({
      username: [''],
      email: [''],
      date: ['', [Validators.required]],
      departmentName: ['', Validators.required],
      doctorname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(9[4-8][0-9]|01[0-9])\d{7}$/)]],
      problem: ['', Validators.required],
      isPaid: [false]
    });
    this.prescriptionForm = this.fb.group({
      prescription: ['', Validators.required],
      dosage: ['', Validators.required],
      instructions: ['', Validators.required]
    });
    this.prescriptionService.getOpdReports().subscribe((data) => {
      this.opdReports = data;
    })
    this.loadInitialData();
    this.fetchPrescriptionsForAppointments();
    this.getAppointmentatAdmin()
    this.getAppointmentTable();
    this.prescriptionService.getOpdReportsinDoctor().subscribe((data) => {
      this.opdReportsinDoctor = data;

    })
  }

  loadInitialData(): void {
    this.departmentService.getDepartment().subscribe((res) => {
      this.departmentNameList = res;
    });
    this.doctorService.getDoctor().subscribe((res) => {
      this.doctorName = res.doctors;

    });
    this.appointmentService.getAppointmentsByDoctorEmail().subscribe((res) => {
      this.getAppointmentByEmailList = res.appointmentwithName;
    });
  }

  fetchPrescriptionsForAppointments(): void {
    this.getAppointmentByEmailList.forEach((appointment) => {

      if (appointment.prescription?._id) {
        this.prescriptionService.getPrescriptionById(appointment.prescription._id).subscribe(
          (data) => {
            appointment.prescriptionDetails = data;
          },
          (error) => {
            console.error('Error fetching prescription:', error);
          }
        );
      }
    });
  }

  filterDoctors(): void {
    const selectedDepartment = this.appointmentForm.get('departmentName')?.value;
  
    if (selectedDepartment) {
      this.filteredDoctors = this.doctorName.filter(doctor =>
        doctor.department === selectedDepartment
      );
      console.log(this.filteredDoctors)
      debugger
    } else {
      this.filteredDoctors = [];
    }
    debugger
  }
  
  
  
  
  submit(): void {
    if (this.appointmentForm.valid) {
      const formData = this.appointmentForm.value;
  
      if (this.editingAppointmentId) {
        this.appointmentService.updateAppointment(this.editingAppointmentId, formData).subscribe(
          (res) => {
            alertify.success('Appointment updated successfully');
            this.editingAppointmentId = null;
            this.appointmentForm.reset();
            this.loadInitialData();
            this.getAppointmentTable();
          },
        //   (error) => {
        //     console.error('Error updating appointment:', error);
        //     alertify.error('Error updating appointment');
        //   }
        // );
        (error) => {
          console.error('Error updating appointment:', error);
          if (error.error?.message) {
            alertify.error(error.error.message);
          } else {
            alertify.error('Error updating appointment');
          }
<<<<<<< HEAD
        );
      } else {
=======
        }
      );} else {
        // Create a new appointment
>>>>>>> b74f493d6798299be6ec564d3adbd61a43649628
        this.appointmentService.postAppointment(this.appointmentForm.value).subscribe(
          (data) => {
            this.loadInitialData();
            this.getAppointmentTable();
            alertify.success('Appointment created successfully');
            this.appointmentForm.reset();
          },
      //     (error) => {
      //       console.error('Error:', error.message || error);
      //       alertify.error('Error: ' + (error.message || 'An unexpected error occurred'));
      //     }
          
      //   );
      // }  
      (error) => {
        console.error('Error creating appointment:', error);
        if (error.error?.message) {
          alertify.error(error.error.message);
        } else {
          alertify.error('Error creating appointment');
        }
      }
    );
  }
    } else {
      alertify.error('Invalid form');
    }
  }
  

  getAppointmentTable() {
    this.appointmentService.getAppointmentByEmail().subscribe((res) => {
      console.log(res);
      this.appointmentTable = res.appointmentByName
      debugger
    })
  }
  getAppointmentatAdmin(){
    this.appointmentService.getAppointmentatAdmin().subscribe((data)=>{
    this.appointmentAdmin = data.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  });

  }
  async deleteAppointment(id: string) {
    console.log('Button clicked');
    const confirmed = await this.confirmationService.showConfirmationPopup();
    if (confirmed) {
      this.appointmentService.deleteAppointment(id).subscribe(
        (response) => {
          this.confirmationService.showSuccessMessage('Delete Successfully')
          this.loadInitialData();
          console.log('Appointment deleted', response);
          this.getAppointmentTable();

        },
        (error) => {
          this.confirmationService.showErrorMessage('Sorry, cannot s deleted')
          console.error('Error deleting Appointment:', error);
          this.loadInitialData();
          this.getAppointmentTable()
        });
    }
    else{
      this.confirmationService.showErrorMessage('Delete operation cancelled')
    }

  }
  makePayment(item: any, amount: number): void {
    const config = {
      publicKey: 'test_public_key_0275cc5e2bae42fb890536aae01e9e73',
      productIdentity: item._id,
      productName: 'Appointment Payment',
      productUrl: 'http://example.com/appointment',
      eventHandler: {
        onSuccess: (payload: any) => {
          this.updatePaymentStatus(item._id, payload, amount);
        },
        onError: (error: any) => {
          alertify.error('Payment failed');
        },
        onClose: () => { }
      },
      paymentPreference: ['KHALTI', 'EBANKING', 'MOBILE_BANKING', 'CONNECT_IPS', 'SCT']
    };

    const checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 10 * 100 }); // Khalti amount is in paisa
  }

  updatePaymentStatus(id: string, payload: any, amount: number): void {
    const paymentData = {
      ...payload,
      amount: amount
    };

    this.appointmentService.updatePaymentStatus(id, paymentData).subscribe(
      (response: any) => {
        alertify.success('Payment successful');
        this.loadInitialData();
      },
      (error: any) => {
        alertify.error('Payment status update failed');
      }
    );
  }
  
  openModal(appointment: any, mode: 'view' | 'prescribe'): void {
    this.selectedAppointment = appointment;
    this.modalMode = mode;
    this.modalTitle = mode === 'prescribe' ? 'Prescribe Medication' : 'Appointment Details';
    this.isModalOpen = true;

    if (mode === 'prescribe' && appointment.prescription) {
      this.prescriptionForm.patchValue({
        prescription: appointment.prescription.prescription,
        dosage: appointment.prescription.dosage,
        instructions: appointment.prescription.instructions
      });
    }
  }
  closeModal(): void {
    this.isModalOpen = false;
    this.prescriptionForm.reset();
  }

  submitPrescription(): void {
    if (this.prescriptionForm.valid) {
      const prescriptionData = this.prescriptionForm.value;

      this.prescriptionService.savePrescription(this.selectedAppointment._id, prescriptionData).subscribe(
        (data) => {
          alertify.success('Prescription saved successfully');
          this.loadInitialData();
          this.closeModal();
        },
        (error) => {
          alertify.error('Failed to save prescription');
        }
      );
    }
  }
  editAppointment(item: any) {
    this.selectedAppointment = item;
    this.editingAppointmentId = item._id;
    
    const doctorEmail = this.doctorName.find(doctor => doctor.firstName + ' ' + doctor.lastName === item.doctorname)?.email;
  
    this.appointmentForm.patchValue({
      departmentName: item.departmentName,
      doctorname: doctorEmail, 
      date: item.date,
      phone: item.phone,
      problem: item.problem,
    });
  }
  
}
