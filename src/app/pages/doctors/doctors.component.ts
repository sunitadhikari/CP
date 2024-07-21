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

  doctors: any[] = []
  ngOnInit(): void {
    this.getDoctor()
  }
  getDoctor() {
    this.doctorService.getDoctor().subscribe((data) => {
      console.log('data');
      this.doctors = data;
    })
  }
  submit(id: string) { }
}
