import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent {
  constructor(private route: Router) { }
  // @Input() doctor: any;
  // doctors = [
  //   {
  //     id: 1,
  //     name: 'Dr. John Doe',
  //     specialty: 'Internal Medicine',
  //     email: 'john.doe@example.com',
  //     phone: '(123) 456-7890',
  //     image: 'assets/doctor.jpg'
  //   },
  //   {
  //     id: 2,
  //     name: 'Dr. Jane Smith',
  //     specialty: 'Pediatrics',
  //     email: 'jane.smith@example.com',
  //     phone: '(123) 456-7891',
  //     image: 'assets/doctor2.jpg'
  //   },
  //   {
  //     id: 3,
  //     name: 'Dr. William Brown',
  //     specialty: 'Cardiology',
  //     email: 'william.brown@example.com',
  //     phone: '(123) 456-7892',
  //     image: 'assets/doctor.jpg'
  //   },
  //   {
  //     id: 4,
  //     name: 'Dr. John Doe',
  //     specialty: 'Internal Medicine',
  //     email: 'john.doe@example.com',
  //     phone: '(123) 456-7890',
  //     image: 'assets/doctor1.jpg'
  //   },
  //   {
  //     id: 5,
  //     name: 'Dr. Jane Smith',
  //     specialty: 'Pediatrics',
  //     email: 'jane.smith@example.com',
  //     phone: '(123) 456-7891',
  //     image: 'assets/doctor2.jpg'
  //   },
  //   {
  //     id: 6,
  //     name: 'Dr. William Brown',
  //     specialty: 'Cardiology',
  //     email: 'william.brown@example.com',
  //     phone: '(123) 456-7892',
  //     image: 'assets/doctor1.jpg'
  //   }
  //   // Add more doctor objects as needed
  // ];

  // submit(id?: number) {
  //   if (id) {
  //     this.route.navigate(['/doctorDetail', id])
  //   }
  // }
}
