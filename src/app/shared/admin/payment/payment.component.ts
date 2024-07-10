import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent  implements OnInit{
  paidAppointments: any[] = [];

  constructor(private appointmentService:AppointmentService){}
  ngOnInit(): void {
    this.getPaidAppointments();
  }

  getPaidAppointments(): void {
    this.appointmentService.paidAppointmentsHistory().subscribe(
      (data) => {
        console.log('Paid appointments fetched successfully:', data);
        this.paidAppointments = data;
      },
      (error) => {
        console.error('Error fetching paid appointments:', error);
        alertify.error('Error fetching paid appointments');
      }
    );
  }
  deletePayment(item: any){}
}