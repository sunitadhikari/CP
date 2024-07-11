import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import * as alertify from 'alertifyjs';
import { DepartmentService } from '../../../core/service/admin/department.service';
import { DoctorService } from '../../../core/service/admin/doctor.service';
import KhaltiCheckout from "khalti-checkout-web";
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-appointment',
  standalone: true,
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  imports: [CommonModule, NgIf, ReactiveFormsModule]
})
export class AppointmentComponent implements OnInit {
  appointmentForm!: FormGroup
  appointmentTable : any[]=[]
  departmentNameList : any[]=[]
  getAppointmentByEmailList : any[]=[]
  doctorName : any[]=[]
  tomorrow: string;
  userRole:string|null |undefined;



  constructor(private fb: FormBuilder,
    private http: HttpClient,
    private appointmentService: AppointmentService,private departmentService:DepartmentService,private doctorService:DoctorService ) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.tomorrow = tomorrow.toISOString().split('T')[0]; 
    this.departmentService.getDepartment().subscribe((res)=>{
      console.log(res);
      this.departmentNameList=res
    })
    this.doctorService.getDoctor().subscribe((res)=>{
      console.log(res);
      this.doctorName=res.doctors
    })

      this.appointmentService.getAppointmentsByDoctorEmail().subscribe((res)=>{
        console.log(res);
        this.getAppointmentByEmailList=res
      })
    
    }


    ngOnInit(): void {
      this.userRole = localStorage.getItem('userRole');
      this.appointmentForm = this.fb.group({
        username: [''],
        email: [''],
        departmentName: ['', Validators.required],
        doctorname: ['', Validators.required],
        date: ['', Validators.required],
        time: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(/^(9[4-8][0-9]|01[0-9])\d{7}$/)]],
        problem: ['', Validators.required],
        isPaid: [false]
      });
      this.getAppointmentByEmail();
    }
  
    submit() {
      console.log('form filled');
      if (this.appointmentForm.valid) {
        this.appointmentService.postAppointment(this.appointmentForm.value).subscribe((data) => {
          console.log(data);
          console.log(this.appointmentForm.value);
  
          alertify.success('Form filled successfully');
          this.appointmentForm.reset();
          this.getAppointmentByEmail();
        });
      } else {
        alertify.error('Invalid form');
      }
    }
  
// getAppointment(){
//   this.appointmentService.getAppointment().subscribe((data)=>{
//     console.log('Table filled succesfully');
//   this.appointmentTable= data;
//   })
// }
getAppointmentByEmail(): void {
  this.appointmentService.getAppointmentByEmail().subscribe((data) => {
    console.log('Table filled successfully');
    this.appointmentTable = data.userAppointments;
  });
}

edit(){}
deleteAppointment(id:string){
this.appointmentService.deleteAppointment(id).subscribe((response)=>{
  alertify.success('Delete Successfully')
  this.getAppointmentByEmail()
  console.log('Appointment Delete', response);
},
error =>{
  console.error('Error deleting Appointment:', error);
  this.getAppointmentByEmail()
}
)
}

makePayment(item: any): void {
  const config = {
    publicKey: 'test_public_key_0275cc5e2bae42fb890536aae01e9e73',
    productIdentity: item._id,
    productName: 'Appointment Payment',
    productUrl: 'http://example.com/appointment',
    eventHandler: {
      onSuccess: (payload: any) => {
        console.log('Payload:', payload); // Log the payload
        this.updatePaymentStatus(item._id, payload);
      },
      onError: (error: any) => {
        console.log(error);
        alertify.error('Payment failed');
      },
      onClose: () => {
        console.log('Widget is closing');
      }
    },
    paymentPreference: ['KHALTI', 'EBANKING', 'MOBILE_BANKING', 'CONNECT_IPS', 'SCT']
  };

  const checkout = new KhaltiCheckout(config);
  checkout.show({ amount: 1000 });
}

updatePaymentStatus(id: string, payload: any): void {
  console.log('Updating payment status:', { id, payload }); 
  this.appointmentService.updatePaymentStatus(id, payload).subscribe(
    (response: any) => {
      alertify.success('Payment successful');
      this.getAppointmentByEmail();
    },
    (error: any) => {
      console.log('Error updating payment status:', error);
      alertify.error('Payment status update failed');
    }
  );
}



}
// departmentName