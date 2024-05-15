import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/service/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder:FormBuilder, private router:Router, private userService: UserService){
  }
  signupForm ! : FormGroup
ngOnInit(): void {
    this.signupForm = this.formBuilder.group({

    })
}
}
