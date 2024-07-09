import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as alertify from 'alertifyjs';
import { UserService } from '../../core/service/user/user.service';


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
  // this.userService.postUserLogin(this.loginForm.value).subscribe((data)=>{
  submit(){
    if(this.loginForm.valid){
      this.userService.postUserLogin(this.loginForm.value).subscribe((res)=>{
        if (res && res.message === 'Login Sucessfull'){
          console.log(res);
          console.log(this.loginForm.value)
          console.log(this.loginForm)
          localStorage.setItem('userData',JSON.stringify(this.loginForm.value));
          localStorage.setItem('userRole',res.role)
          // localStorage.setItem('userRole',JSON.stringify(res.role))
          // localStorage.setItem('userToken',JSON.stringify(res.token))
          localStorage.setItem('userToken',res.token)
          this.router.navigate(['/dashboard'])
          
          alertify.success('Login  Sucessfull')
        }
        else{
          alertify.error('enter Valid username and password')

        }
      })
    }
    else{
      alertify.error('error')
    }
  }
}
