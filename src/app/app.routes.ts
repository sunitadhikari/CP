import { Routes } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { DoctorDetailComponent } from './pages/doctor-detail/doctor-detail.component';
import { DashboardNavigationComponent } from './shared/admin/dashboard-navigation/dashboard-navigation.component';
import { DashboardOverviewComponent } from './shared/admin/overview/dashboard-overview.component';
import { authGuard } from './auth.guard';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ServicesComponent } from './core/service/user/services.component';

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
        canActivate: [authGuard]
    },
    {
        path: 'doctor',
        component: DoctorsComponent
    },

    {
        path: 'doctorDetail:id',
        component: DoctorDetailComponent
    },
    {
        path: 'overview',
        component: DashboardOverviewComponent
    },
    {
        path: 'about-us',
        component: AboutUsComponent
    },
    {
        path:'contact-us',
        component:ContactUsComponent
    },
    {
        path:'services',
        component:ServicesComponent
    }
];
