import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ReportService } from '../../../core/service/report-service/report.service';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import { UserService } from '../../../core/service/user/user.service';
import { NgxPaginationModule } from 'ngx-pagination'; 
import { HttpClient } from '@angular/common/http';


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
  patientDataByDoctor :any[]=[]
  Admittedpatients:any[]=[]
  hospitalReports: any[] = []; 
  loading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedPatient: any;

  constructor(private fb:FormBuilder,private reportservice:ReportService,private appointmetnService:AppointmentService
,private userService:UserService,private http: HttpClient

  ){}

  ngOnInit(): void {
    this.userRole= localStorage.getItem('userRole')
    this.doctorDischargeReportForm = this.fb.group({
      patientName: [{ value: '', disabled: true }],
      patientAge: [{ value: '', disabled: true }],
      gender: [{ value: '', disabled: true }],
      contactNumber: [{ value: '', disabled: true }],
      address: [{ value: '', disabled: true }],
      medicalHistory: [{ value: '', disabled: true }],
      department: [{ value: '', disabled: true }],
      ward: [{ value: '', disabled: true }],
      bedNumber: [{ value: '', disabled: true }],
      admittedAt: [{ value: '', disabled: true }],
      dischargeDate: [{ value: '' }],
      diagnosis: [''],
      treatmentGiven: [''],
      dischargeInstructions: [''],
      followUpPlan: ['']
    });
  
    this.userService.getPatients().subscribe((res)=>{
      console.log(res);
      this.patientData=res
      
    })
    this.reportservice.getDischargeReportsByDoctor().subscribe((res)=>{
      console.log(res);
      this.patientDataByDoctor=res

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

    // this.hospitalDischargeReportForm.get('patientName')?.valueChanges.subscribe((patientId) => {
    //   this.onPatientSelect(patientId);
      
    // });
    this.hospitalDischargeReportForm.get('patientName')?.valueChanges.subscribe((patientId) => {
      this.onPatientSelectForAdmin(patientId);
      
    });
    this.fetchHospitalReports();
    this.fetchAdmittedPatients();
    

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
  onPatientSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const patientId = target.value;
    const selectedPatient = this.Admittedpatients.find(patient => patient._id === patientId);
    if (selectedPatient) {
      this.patchFormWithPatientData(selectedPatient);
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
 
  

fetchAdmittedPatients(): void {
  this.reportservice.getAdmnittedPatientReports().subscribe((res)=>{
    this.Admittedpatients=res.patient
  })
}
// onPatientSelect(patient: any): void {
//   this.selectedPatient = patient;
//   this.patchFormWithPatientData(patient);
// }

 patchFormWithPatientData(patient: any): void {
    this.doctorDischargeReportForm.patchValue({
      patientName: `${patient.firstName} ${patient.lastName}`,
      patientAge: this.calculateAge(patient.dob),
      gender: patient.gender,
      contactNumber: patient.contactNumber,
      address: patient.address,
      medicalHistory: patient.medicalHistory,
      department: patient.department,
      ward: patient.ward,
      bedNumber: patient.bedNumber,
      admittedAt: new Date(patient.admittedAt).toLocaleDateString(),
      // dischargeDate: patient.dischargeDate ? new Date(patient.dischargeDate).toLocaleDateString() : ''
    });
  }
  // onPatientSelectForAdmin(event: Event): void {
  //   const target = event.target as HTMLSelectElement;
  //   const patientId = target.value;
  
  //   if (patientId) {
  //     this.reportservice.getPatientById(patientId).subscribe(
  //       patient => {
  //         this.patchFormWithPatientDataForAdmin(patient);
  //       },
  //       error => {
  //         console.error('Error fetching patient details:', error);
  //       }
  //     );
  //   } else {
  //     this.hospitalDischargeReportForm.reset();
  //   }
  // }
  onPatientSelectForAdmin(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast the event target to HTMLSelectElement
    const patientId = selectElement.value; // Get the selected value
  
    if (patientId) {
      this.reportservice.getPatientById(patientId).subscribe(
        patient => {
          this.patchFormWithPatientDataForAdmin(patient);
        },
        error => {
          console.error('Error fetching patient details:', error);
        }
      );
    } else {
      this.hospitalDischargeReportForm.reset();
    }
  }
  patchFormWithPatientDataForAdmin(patient: any): void {
    this.hospitalDischargeReportForm.patchValue({
      patientName: `${patient.patientName} `,
      patientAge: this.calculateAge(patient.dob),
      patientGender: patient.gender,
      admissionDate: patient.admissionDate ? new Date(patient.admissionDate).toISOString().split('T')[0] : '',
      dischargeDate: patient.dischargeDate ? new Date(patient.dischargeDate).toISOString().split('T')[0] : '',
      finalDiagnosis: patient.finalDiagnosis || '',
      summaryOfTreatment: patient.summaryOfTreatment || '',
      dischargeMedications: patient.dischargeMedications || '',
      followUpInstructions: patient.followUpInstructions || ''
    });
  }

calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs); 
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
submitDoctorReport(): void {
  this.doctorDischargeReportForm.enable();  // Enable all controls temporarily

  if (this.doctorDischargeReportForm.valid) {
    this.reportservice.postDoctorReport(this.doctorDischargeReportForm.value)
      .subscribe(
        (response) => {
          console.log('Doctors discharge report submitted successfully:', response);
          this.doctorDischargeReportForm.reset();
          this.doctorDischargeReportForm.disable();  // Disable controls again
        },
        (error) => {
          console.error('Error submitting doctors discharge report:', error);
          this.doctorDischargeReportForm.disable();  // Disable controls if there's an error
        }
      );
  } else {
    console.error('Form is invalid!');
    this.doctorDischargeReportForm.disable();  // Disable controls if form is invalid
  }
}
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