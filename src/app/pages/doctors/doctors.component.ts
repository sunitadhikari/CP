import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { Router } from '@angular/router';
import { DoctorService } from '../../core/service/admin/doctor.service';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {
  constructor(private route: Router, private doctorService: DoctorService) {
  }

  doctors: any[] = [
    {
      image: 'https://img.freepik.com/free-photo/portrait-smiling-young-female-doctor-white-coat_1262-12749.jpg?w=1380&t=st=1684686000~exp=1684686600~hmac=d1f4d3c7f6c7f1f6c7f6c7f6c7f6c7f6',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'Experienced orthopedic surgeon with a passion for patient care.'
    },
    {
      image: 'https://c8.alamy.com/comp/D8F077/male-african-american-medical-doctor-with-tablet-computer-on-white-D8F077.jpg',
      name: 'John Doe',
      department: 'cardiology',
      active: 'active',
      biography: 'Cardiologist with over 10 years of experience.'
    },
    {
      image: 'https://i.pinimg.com/736x/dc/04/aa/dc04aaae4d9a84ad7c4a3be7bc4e9766.jpg',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'Experienced orthopedic surgeon with a passion for patient care.'
    },
    {
      image: 'https://img.freepik.com/free-photo/portrait-smiling-young-female-doctor-white-coat_1262-12749.jpg?w=1380&t=st=1684686000~exp=1684686600~hmac=d1f4d3c7f6c7f1f6c7f6c7f6c7f6c7f6',
      name: 'John Doe',
      department: 'cardiology',
      active: 'active',
      biography: 'Cardiologist with over 10 years of experience.'
    }
  ]
  try: any[] = [
    {
      image: 'https://img.freepik.com/free-photo/young-woman-doctor-white-coat-with-stethoscope-smiling-confident-standing-with-arms-crossed-white-wall_141793-47701.jpg?t=st=1721584031~exp=1721587631~hmac=5fc485301ffd0f7abffa28ef0d1e22c21238e2e91958ff916a3acfc2cee175ee&w=900',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'jddjfkdddddjffffffffffffffffffffffdddkfjkfjkrdfgffffffffffgdfkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghfjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkh'
    },
    {
      image: 'https://as1.ftcdn.net/v2/jpg/06/64/62/08/1000_F_664620894_KN7WA859syQPK6rwNWBSky1iLwYhb3Gt.jpg',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'jddjfkdddddjffffffffffffffffffffffdddkfjkfjkrdfgffffffffffgdfkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghfjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkh'
    },
    {
      image: 'https://as2.ftcdn.net/v2/jpg/07/30/32/13/1000_F_730321317_O8TqWT6TlE4pyjQWwaHVKdoN42rbFQ6x.jpg',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'jddjfkdddddjfffff'
    },
    {
      image: 'https://as2.ftcdn.net/v2/jpg/07/30/32/13/1000_F_730321317_O8TqWT6TlE4pyjQWwaHVKdoN42rbFQ6x.jpg',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'jddjfkdddddjffffffffffffffffffffffdddkfjkfjkrdfgffffffffffgdfkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghfjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkh'
    },
    {
      image: 'https://as1.ftcdn.net/v2/jpg/02/84/73/60/1000_F_284736083_c0RHHXpoDrVHM0VNiWDLjUZvTPdt4iUX.jpg',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'jddjfkdddddjffffffffffffffffffffffdddkfjkfjkrdfgffffffffffgdfkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghfjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkh'
    },
    {
      image: 'https://as2.ftcdn.net/v2/jpg/07/30/32/13/1000_F_730321317_O8TqWT6TlE4pyjQWwaHVKdoN42rbFQ6x.jpg',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'jddjfkdddddjffffffffffffffffffffffdddkfjkfjkrdfgffffffffffgdfkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghfjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkh'
    },
    {
      image: 'https://as1.ftcdn.net/v2/jpg/02/84/73/60/1000_F_284736083_c0RHHXpoDrVHM0VNiWDLjUZvTPdt4iUX.jpg',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'jddjfkdddddjffffffffffffffffffffffdddkfjkfjkrdfgffffffffffgdfkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghfjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkh'
    },
    {
      image: 'https://as1.ftcdn.net/v2/jpg/02/84/73/60/1000_F_284736083_c0RHHXpoDrVHM0VNiWDLjUZvTPdt4iUX.jpg',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'jddjfkdddddjffffffffffffffffffffffdddkfjkfjkrdfgffffffffffgdfkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghfjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkh'
    },
    {
      image: 'https://as1.ftcdn.net/v2/jpg/02/84/73/60/1000_F_284736083_c0RHHXpoDrVHM0VNiWDLjUZvTPdt4iUX.jpg',
      name: 'Sanduk Raut',
      department: 'orthopedics',
      active: 'active',
      biography: 'jddjfkdddddjffffffffffffffffffffffdddkfjkfjkrdfgffffffffffgdfkggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghfjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkjkh'
    }
  ]
  ngOnInit(): void {
    this.getDoctor()
  }
  getDoctor() {
    this.doctorService.getDoctor().subscribe((data) => {
      console.log('data');
      this.doctors = data.doctors;
    })
  }
  submit(id: string) { }
}
