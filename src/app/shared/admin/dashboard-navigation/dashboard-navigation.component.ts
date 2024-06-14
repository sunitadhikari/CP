import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardOverviewComponent } from "../overview/dashboard-overview.component";
import { ProfilComponent } from "../profil/profil.component";
import { DashboardFeedbackComponent } from "../feedback/feedback.component";
import { DashboardReportComponent } from "../reports/dashboard-report.component";
import { DashboardNotificationComponent } from "../notification/notification.component";
import { DashboardAppointmentComponent } from "../appointments/dashboard-appointment.component";
import { DashboardDoctorComponent } from "../doctors/doctors.component";
import { SettingComponent } from "../setting/setting.component";
import { PatientListComponent } from "../patient-list/patient-list.component";
import { AddPatientComponent } from "../add-patient/add-patient.component";
import { AddScheduleComponent } from "../add-schedule/add-schedule.component";
import { ScheduleListComponent } from "../schedule-list/schedule-list.component";
import { UserManagementComponent } from "../user-management/user-management.component";
import { PaymentComponent } from "../payment/payment.component";
import { DoctorsComponent } from "../../../pages/doctors/doctors.component";
import { DoctorComponent } from "../doctor/doctor.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { PatientComponent } from "../patient/patient.component";
import { AppointmentHistoryComponent } from "../appointment-history/appointment-history.component";
import { SymptomsComponent } from "../symptoms/symptoms.component";
import { ViewHistoryComponent } from "../view-history/view-history.component";
import { SendMailComponent } from "../send-mail/send-mail.component";
import { PrescriptionComponent } from "../prescription/prescription.component";
import { ScheduleComponent } from "../schedule/schedule.component";
import { BedManagementComponent } from '../bed-management/bed-management.component';
import { DepartmentComponentimplements } from "../department/department.component";
import { RoomManagementComponent } from '../room-management/room-management.component';

@Component({
    selector: 'app-dashboard-navigation',
    standalone: true,
    templateUrl: './dashboard-navigation.component.html',
    styleUrl: './dashboard-navigation.component.css',
    imports: [CommonModule, DashboardOverviewComponent, ProfilComponent,
        DashboardReportComponent, DashboardNotificationComponent,
        DashboardAppointmentComponent, DashboardDoctorComponent, SettingComponent,
        PatientListComponent, AddPatientComponent, AddScheduleComponent,
        ScheduleListComponent, DashboardFeedbackComponent, UserManagementComponent,
        PaymentComponent, DoctorsComponent, DoctorComponent, DashboardComponent,
        PatientComponent, AppointmentHistoryComponent,
        SymptomsComponent, ViewHistoryComponent, SendMailComponent,
        BedManagementComponent,RoomManagementComponent,
        PrescriptionComponent, ScheduleComponent, DepartmentComponentimplements]
})
export class DashboardNavigationComponent implements OnInit{
  currentSection: string = 'dashboard';
  userRole:string|null |undefined;
  dowpdowns: { [Key: string]: boolean } = {
    patient: false,
  }

  constructor(private router: Router) {
    this.currentSection = 'bed-management'
  }
  ngOnInit(): void {
      this.userRole= localStorage.getItem('userRole')
  }
  toogleDropdown(section: string): void {
    this.dowpdowns[section] = !this.dowpdowns[section];
  }
  showSection(section: string): void {
    this.currentSection = section;
  }
  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }
}
