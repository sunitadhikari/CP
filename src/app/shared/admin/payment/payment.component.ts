import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';

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
  selectedAppointment: any;

  constructor(private appointmentService: AppointmentService) {}

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
}
