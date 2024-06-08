import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

@Component({
    selector: 'app-dashboard-navigation',
    standalone: true,
    templateUrl: './dashboard-navigation.component.html',
    styleUrl: './dashboard-navigation.component.css',
    imports: [CommonModule, DashboardOverviewComponent, ProfilComponent,
        DashboardReportComponent, DashboardNotificationComponent,
        DashboardAppointmentComponent, DashboardDoctorComponent, SettingComponent,
        PatientListComponent, AddPatientComponent, AddScheduleComponent,
        ScheduleListComponent, DashboardFeedbackComponent]
})
export class DashboardNavigationComponent {
  currentSection: string = 'overview';
  dowpdowns:{ [ Key: string]: boolean}={
    patient:false,
  }

  constructor(private router: Router) {
    this.currentSection = 'appointment'
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
