import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ReportService } from '../../../core/service/report-service/report.service';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import { UserService } from '../../../core/service/user/user.service';
import { NgxPaginationModule } from 'ngx-pagination'; 


@Component({
  selector: 'app-dashboard-report',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,NgxPaginationModule],
  templateUrl: './dashboard-report.component.html',
  styleUrl: './dashboard-report.component.css'
})

export class DashboardReportComponent implements OnInit{
  userRole:string|null |undefined;
  doctorDischargeReportForm!: FormGroup;
  hospitalDischargeReportForm!: FormGroup;
  patientData:any[]=[]
  hospitalReports: any[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  constructor(private fb:FormBuilder,private reportservice:ReportService,private appointmetnService:AppointmentService
,private userService:UserService

  ){}

  ngOnInit(): void {
    this.userRole= localStorage.getItem('userRole')
    this.doctorDischargeReportForm = this.fb.group({
      patientName: ['', Validators.required],
      patientAge: ['', Validators.required],
      diagnosis: ['', Validators.required],
      treatmentGiven: ['', Validators.required],
      dischargeInstructions: ['', Validators.required],
      followUpPlan: ['', Validators.required]
    });
    this.userService.getPatients().subscribe((res)=>{
      console.log(res);
      this.patientData=res
      
    })

    this.hospitalDischargeReportForm = this.fb.group({
      patientName: ['', Validators.required],
      patientAge: [{ value: '', disabled: true }, Validators.required],
      patientGender: ['', Validators.required],
      admissionDate: ['', Validators.required],
      dischargeDate: ['', Validators.required],
      finalDiagnosis: ['', Validators.required],
      summaryOfTreatment: ['', Validators.required],
      dischargeMedications: ['', Validators.required],
      followUpInstructions: ['', Validators.required]
    }, { validators: this.dateGapValidator() });

    this.hospitalDischargeReportForm.get('patientName')?.valueChanges.subscribe((patientId) => {
      this.onPatientSelect(patientId);
      
    });
    this.fetchHospitalReports();

  }
  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  }
  dateGapValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const admissionDate = control.get('admissionDate')?.value;
      const dischargeDate = control.get('dischargeDate')?.value;

      if (admissionDate && dischargeDate) {
        const admission = new Date(admissionDate);
        const discharge = new Date(dischargeDate);

        const timeDiff = discharge.getTime() - admission.getTime();
        const dayDiff = timeDiff / (1000 * 3600 * 24);

        if (dayDiff < 1 || dayDiff > 2) {
          return { 'dateGapInvalid': true };
        }
      }

      return null;
    };
  }
  onPatientSelect(patientId: string): void {
    const selectedPatient = this.patientData.find(patient => patient._id === patientId);
    if (selectedPatient) {
      const age = this.calculateAge(selectedPatient.dob);
      this.hospitalDischargeReportForm.patchValue({
        patientAge: age,
        patientGender: selectedPatient.sex || '',
        // Add other fields as necessary
      });
      
    }
  }
  fetchHospitalReports(): void {
    this.loading = true;
    this.reportservice.getHospitalDischargeReports().subscribe(
      (data) => {
        this.hospitalReports = data; 

      },
      (error) => {
        console.error('Error fetching hospital reports:', error);
      }
    );
  }
submitDoctorReport(): void {
  if (this.doctorDischargeReportForm.valid) {
    this.reportservice.postDoctorReport(this.doctorDischargeReportForm.value)
      .subscribe(
        (response) => {
          console.log('Doctors discharge report submitted successfully:', response);
          this.doctorDischargeReportForm.reset();
        },
        (error) => {
          console.error('Error submitting doctors discharge report:', error);
        }
      );
  }
}

// submitHospitalReport(): void {
//   if (this.hospitalDischargeReportForm.valid) {
//     this.reportservice.postHospitalReport(this.hospitalDischargeReportForm.value)
//       .subscribe(
//         (response) => {
//           console.log('Hospital discharge report submitted successfully:', response);
//           this.hospitalDischargeReportForm.reset();
//         },
//         (error) => {
//           console.error('Error submitting hospital discharge report:', error);
//         }
//       );
//   }
// }
// }
submitHospitalReport(): void {
  if (this.hospitalDischargeReportForm.valid) {
    this.reportservice.postHospitalReport(this.hospitalDischargeReportForm.value).subscribe(
      (response) => {
        console.log('Hospital discharge report submitted successfully:', response);
        this.hospitalDischargeReportForm.reset();
      },
      (error) => {
        console.error('Error submitting hospital discharge report:', error);
      }
    );
  }
}
}