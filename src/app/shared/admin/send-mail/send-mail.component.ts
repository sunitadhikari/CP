// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { EmailService } from '../../../core/service/email-service/email.service';

// @Component({
//   selector: 'app-send-mail',
//   standalone: true,
//   imports: [FormsModule,ReactiveFormsModule],
//   templateUrl: './send-mail.component.html',
//   styleUrl: './send-mail.component.css'
// })
// export class SendMailComponent {
//   emailForm: FormGroup;

//   constructor(private formBuilder: FormBuilder, private emailService:EmailService) {
//     this.emailForm = this.formBuilder.group({
//       to: ['', [Validators.required, Validators.email]],
//       subject: ['', Validators.required],
//       message: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     if (this.emailForm.valid) {
//     this.emailService.sendEmail(this.emailForm.value).subscribe((res)=>{
//       console.log(res);
//       this.emailForm.reset()
//     })     
//   }
// }
// }
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../../core/service/email-service/email.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-send-mail',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent {
  emailForm: FormGroup;
  attachments: File[] = [];

  constructor(private formBuilder: FormBuilder, private emailService: EmailService) {
    this.emailForm = this.formBuilder.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      attachments: [null]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.attachments = Array.from(event.target.files);
    }
  }

  onSubmit() {
    if (this.emailForm.valid) {
      const formData = new FormData();
      formData.append('to', this.emailForm.get('to')!.value);
      formData.append('subject', this.emailForm.get('subject')!.value);
      formData.append('message', this.emailForm.get('message')!.value);
      this.attachments.forEach(file => {
        formData.append('attachments', file, file.name);
      });

      this.emailService.sendEmail(formData).subscribe(res => {
        console.log(res);
        this.emailForm.reset();
        this.attachments = [];
      });
    }
  }
}
