import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';
import { BillService } from '../../../core/service/bill-service/bill.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paidAppointments: any[] = [];
  isModalVisible = false;
  payments: any[] = [];
  selectedAppointment: any;
  userRole: string | null | undefined;


  constructor(
    private appointmentService: AppointmentService,
    private paymentService:BillService

  ) {}

  ngOnInit(): void {
    this.getPaidAppointments();
    this.getAllPayments();
    this.userRole = localStorage.getItem('userRole');

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

  deletePayment(appointmentId: string): void {
    // Implement the delete logic here
    console.log(`Deleting payment with ID: ${appointmentId}`);
    alertify.success('Payment deleted successfully');
    this.paidAppointments = this.paidAppointments.filter(appointment => appointment._id !== appointmentId);
  }

  viewAppointment(appointment: any): void {
    this.selectedAppointment = appointment;
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  getAllPayments(): void {
    this.paymentService.getAllPayments().subscribe(
      data => {
        this.payments = data;
        console.log('Payments:', this.payments);
      },
      error => {
        console.error('Failed to retrieve payments', error);
      }
    );
  }
}
