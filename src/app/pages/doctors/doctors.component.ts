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
isExpanded = false;
toogleBiography(){
  this.isExpanded = !this.isExpanded;
}
  doctors: any[] = [
    {
      picture: 'https://img.freepik.com/free-photo/portrait-smiling-young-female-doctor-white-coat_1262-12749.jpg?w=1380&t=st=1684686000~exp=1684686600~hmac=d1f4d3c7f6c7f1f6c7f6c7f6c7f6c7f6',
     
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
     
    },
    {
      image: 'https://img.freepik.com/free-photo/portrait-smiling-young-female-doctor-white-coat_1262-12749.jpg?w=1380&t=st=1684686000~exp=1684686600~hmac=d1f4d3c7f6c7f1f6c7f6c7f6c7f6c7f6',
      name: 'John Doe',
      department: 'cardiology',
      active: 'active',
      biography: 'Cardiologist with over 10 years of experience.'
    }
  ]

  ngOnInit(): void {
    this.getDoctor()
  }
  submit(){}
  getDoctor() {
    this.doctorService.getDoctor().subscribe((data) => {
      console.log('data');
      this.doctors = data.doctors;
    })
  }

}
