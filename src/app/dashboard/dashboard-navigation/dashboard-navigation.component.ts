import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardOverviewComponent } from "../dashboard-overview/dashboard-overview.component";
import { ProfilComponent } from "../profil/profil.component";
import { DashboardFeedbackComponent } from "../dashboard-feedback/dashboard-feedback.component";
import { DashboardReportComponent } from "../dashboard-report/dashboard-report.component";
import { DashboardNotificationComponent } from "../dashboard-notification/dashboard-notification.component";
import { DashboardAppointmentComponent } from "../dashboard-appointment/dashboard-appointment.component";
import { DashboardDoctorComponent } from "../dashboard-doctor/dashboard-doctor.component";
import { SettingComponent } from "../setting/setting.component";
import { PatientListComponent } from "../patient-list/patient-list.component";
import { AddPatientComponent } from "../add-patient/add-patient.component";
import { AddScheduleComponent } from "../add-schedule/add-schedule.component";
import { ScheduleListComponent } from "../schedule-list/schedule-list.component";

@Component({
    selector: 'app-dashboard-navigation',
    standalone: true,
    templateUrl: './dashboard-navigation.component.html',
    styleUrl: './dashboard-navigation.component.css',
    imports: [CommonModule, DashboardOverviewComponent, ProfilComponent, DashboardFeedbackComponent, DashboardReportComponent, DashboardNotificationComponent, DashboardAppointmentComponent, DashboardDoctorComponent, SettingComponent, PatientListComponent, AddPatientComponent, AddScheduleComponent, 
      ScheduleListComponent]
})
export class DashboardNavigationComponent {
  currentSection: string = 'overview';
  dowpdowns:{ [ Key: string]: boolean}={
    patient:false,
  }

  constructor(private router: Router) {
    this.currentSection = 'addSchedule'
  }
  toogleDropdown(section:string):void{
    this.dowpdowns[section]=!this.dowpdowns[section];
  }
  showSection(section: string): void {
    this.currentSection = section;
  }
  logout() {
    localStorage.clear()
    this.router.navigate([''])
  }
}
