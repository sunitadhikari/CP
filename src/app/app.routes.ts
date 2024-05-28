import { Routes } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DasboardsComponent } from './shared/dashboard/dashboards/dashboards.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';

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
        component: DasboardsComponent
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
    }
];
