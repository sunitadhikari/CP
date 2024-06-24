import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../../core/service/email-service/email.service';

@Component({
  selector: 'app-send-mail',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './send-mail.component.html',
  styleUrl: './send-mail.component.css'
})
export class SendMailComponent {
  emailForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private emailService:EmailService) {
    this.emailForm = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {
    this.emailService.sendEmail(this.emailForm.value).subscribe((res)=>{
      console.log(res);
      this.emailForm.reset()
    })     
  }
}
}