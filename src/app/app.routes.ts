import { Routes } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { DashboardNavigationComponent } from './dashboard/dashboard-navigation/dashboard-navigation.component';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardDoctorComponent } from './dashboard/dashboard-doctor/dashboard-doctor.component';
import { DashboardAppointmentComponent } from './dashboard/dashboard-appointment/dashboard-appointment.component';
import { DashboardReportComponent } from './dashboard/dashboard-report/dashboard-report.component';
import { DashboardNotificationComponent } from './dashboard/dashboard-notification/dashboard-notification.component';
import { DashboardFeedbackComponent } from './dashboard/dashboard-feedback/dashboard-feedback.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'navbar',
        component: NavbarComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardNavigationComponent
    },
    {
        path:'doctor',
        component:DoctorsComponent
    },
    {
        path:'appointment',
        component:AppointmentComponent
    }, 
    {
        path:'doctorDetail:id',
        component:DoctorDetailComponent
    },
    {
        path:'overview',
        component:DashboardOverviewComponent
    },
    {
        path:'dashboardDoctor',
        component:DashboardDoctorComponent
    },
    {
        path:'dashAppoinment',
        component:DashboardAppointmentComponent
    },
    {
        path:'dashReport',
        component:DashboardReportComponent
    },
    {
        path:'dashNotification',
        component:DashboardNotificationComponent
    }, 
{
    path:'dashFeedback',
    component:DashboardFeedbackComponent
}

];
