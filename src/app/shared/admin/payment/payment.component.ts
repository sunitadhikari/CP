import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';
import { BillService } from '../../../core/service/bill-service/bill.service';
import { HttpClient } from '@angular/common/http';

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
  admitpayments: any[] = [];
  selectedPayment: any;



  constructor(
    private appointmentService: AppointmentService,
    private paymentService:BillService,
    private http: HttpClient

  ) {}

  ngOnInit(): void {
    this.getPaidAppointments();
    this.getAllPayments();
    this.getAdmitPayments();
    this.userRole = localStorage.getItem('userRole');

  }
  openModalD(payment: any): void {
    this.selectedPayment = payment;
    console.log('Selected payment:', this.selectedPayment);

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
  getAdmitPayments(): void {
    this.http.get<any[]>('http://localhost:3000/admit-patient-payments')
      .subscribe(
        (data) => {
          this.admitpayments = data;
        },
        (error) => {
          console.error('Error fetching payment data', error);
        }
      );
  }
  
}
