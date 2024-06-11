import { Routes } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { DashboardNavigationComponent } from './shared/admin/dashboard-navigation/dashboard-navigation.component';
import { DashboardOverviewComponent } from './shared/admin/overview/dashboard-overview.component';
import { DashboardDoctorComponent } from './shared/admin/doctors/doctors.component';
import { DashboardAppointmentComponent } from './shared/admin/appointments/dashboard-appointment.component';
import { DashboardReportComponent } from './shared/admin/reports/dashboard-report.component';
import { DashboardNotificationComponent } from './shared/admin/notification/notification.component';
import { DashboardFeedbackComponent } from './shared/admin/feedback/feedback.component';
import { PaymentComponent } from './shared/admin/payment/payment.component';
import { AddPatientComponent } from './shared/admin/add-patient/add-patient.component';
import { authGuard } from './auth.guard';

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
        component: DashboardNavigationComponent,
        canActivate:[authGuard]
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

];
