import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-appointment',
    standalone: true,
    templateUrl: './appointment.component.html',
    styleUrl: './appointment.component.css',
    imports: [NavbarComponent, FooterComponent, CommonModule, NgIf, ReactiveFormsModule]
})
export class AppointmentComponent implements OnInit{
appointmentForm! : FormGroup 
constructor(private fb: FormBuilder, private route:Router){}
ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      name:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      phone:['',[Validators.required, Validators.pattern(/^(9[4-8][0-9]|01[0-9])\d{7}$/)]],
      date:['', Validators.required],
      time:['', Validators.required],
      doctor:['', Validators.required]
    })
}
submit(){
if(this.appointmentForm.valid){
  console.log('Form Submitted', this.appointmentForm.value);
  // this.route.navigate(['/payment'])
}
else{
  console.log('Form is not valid');
}
}
}
