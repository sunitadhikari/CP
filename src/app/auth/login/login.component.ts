import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
constructor(private userService:UserService, private router:Router, private formBuilder:FormBuilder){
}
loginForm! : FormGroup
ngOnInit(): void {
  this.loginForm = this.formBuilder.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', Validators.required]
  })
  }
  submit(){
    if(this.loginForm.valid){
      this.userService.postUserLogin(this.loginForm.value).subscribe((data)=>{
        if(this.loginForm.value.email, this.loginForm.value.password){
          console.log(data);
          localStorage.setItem('userData', JSON.stringify(this.loginForm.value))
          alertify.success('Login Sucessfully')
          this.router.navigate(['/'])
        }
        else{
          alertify.error('Username and password does not match')
        }
      })
    }
    else{
      alertify.error('Please enter valid data')
    }
  }
}
