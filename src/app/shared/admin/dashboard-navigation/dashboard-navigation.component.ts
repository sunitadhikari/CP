import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardOverviewComponent } from "../overview/dashboard-overview.component";
import { ProfilComponent } from "../profil/profil.component";
import { DashboardFeedbackComponent } from "../feedback/feedback.component";
import { DashboardReportComponent } from "../reports/dashboard-report.component";
import { DashboardNotificationComponent } from "../notification/notification.component";
import { SettingComponent } from "../setting/setting.component";
import { PatientListComponent } from "../patient-list/patient-list.component";
import { AddPatientComponent } from "../add-patient/add-patient.component";
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
import { LabComponent } from "../Lab/lab/lab.component";
import { NoteComponent } from '../../../pages/note/note.component';
import { MedicalHistoryComponent } from "../../../pages/patient/medical-history/medical-history.component";
import { AppointmentComponent } from '../appointments/appointment.component';
import { DoctorPrescriptionComponent } from "../../../pages/doctor-prescription/doctor-prescription.component";
import { AdmitPatientComponent } from '../../../pages/admit-patient/admit-patient.component';
import { DailyReportComponent } from '../../../pages/daily-report/daily-report.component';
import { MedicalPescribeComponent } from '../../../pages/medical-pescribe/medical-pescribe.component';
import { ReceptionComponent } from "../../../pages/reception/reception/reception.component";
import { WardComponent } from '../../../pages/ward/ward.component';
import { RecSymptomsComponent } from "../../../pages/reception/rec-symptoms/rec-symptoms.component";

@Component({
    selector: 'app-dashboard-navigation',
    standalone: true,
    templateUrl: './dashboard-navigation.component.html',
    styleUrl: './dashboard-navigation.component.css',
    imports: [CommonModule, DashboardOverviewComponent, ProfilComponent,
    DashboardReportComponent, DashboardNotificationComponent, SettingComponent,
    PatientListComponent, AddPatientComponent, DashboardFeedbackComponent, UserManagementComponent,
    PaymentComponent, DoctorsComponent, DoctorComponent, DashboardComponent,
    PatientComponent, AppointmentHistoryComponent, MedicalPescribeComponent,
    SymptomsComponent, ViewHistoryComponent, SendMailComponent, WardComponent,
    BedManagementComponent, RoomManagementComponent, NoteComponent, AppointmentComponent,
    PrescriptionComponent, ScheduleComponent, DepartmentComponentimplements, AdmitPatientComponent, DailyReportComponent,
    LabComponent, MedicalHistoryComponent, AppointmentComponent, DoctorPrescriptionComponent, ReceptionComponent, RecSymptomsComponent]
})
export class DashboardNavigationComponent implements OnInit{
  currentSection: string = 'dashboard';
  userRole:string|null |undefined;
  dowpdowns: { [Key: string]: boolean } = {
    patient: false,
  }

  constructor(private router: Router) {
    this.currentSection = 'dashboard'
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
