import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ReportService } from '../../../core/service/report-service/report.service';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import { UserService } from '../../../core/service/user/user.service';
import { NgxPaginationModule } from 'ngx-pagination';
import * as alertify from 'alertifyjs';
import KhaltiCheckout from "khalti-checkout-web";
import { HttpClient } from '@angular/common/http';
import { BillService } from '../../../core/service/bill-service/bill.service';
import { MatIconModule } from '@angular/material/icon';
import { SymptomsService } from '../../../core/service/symptoms/symptoms.service';



@Component({
  selector: 'app-dashboard-report',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule, MatIconModule, FormsModule],
  templateUrl: './dashboard-report.component.html',
  styleUrl: './dashboard-report.component.css'
})

export class DashboardReportComponent implements OnInit {
  userRole: string | null | undefined;
  doctorDischargeReportForm!: FormGroup;
  hospitalDischargeReportForm!: FormGroup;
  patientData: any[] = []
  patientDataByDoctor: any[] = []
  Admittedpatients: any[] = []
  hospitalReports: any[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedPatient: any;
  dischargeBill: any;
  cashDetails: string = '';
  billForm!: FormGroup;
  selectedReport: any;
  paymentType: string = 'cash';
  billGenerated: boolean = false;
  paidAmount: number = 0;
  dischargeReports: any[] = [];
  doctorDischargeReport:any[]=[]
  private apiUrl = 'http://localhost:3000/gethospitalDischargeReport';
  prescriptions: any[] = [];

  

  patient = {
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    admissionDate: '2024-08-10',
    dischargeDate:'2024-4-12',
    diagnosis: 'Hypertension'
  };

  currentYear: number = new Date().getFullYear();


  constructor(
    private fb: FormBuilder,
    private reportservice: ReportService,
    private appointmetnService: AppointmentService,
    private userService: UserService, private http: HttpClient,
    private billService: BillService,
    private symptomsService:SymptomsService
    

  ) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole')
    this.loadPrescriptions();

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
      followUpPlan: [''],
      dischargeRequest: [true]
    });

    // this.userService.getPatients().subscribe((res)=>{
    //   console.log(res);
    //   this.patientData=res

    // })
    this.reportservice.getDischargeReportsByDoctor().subscribe((res) => {
      console.log(res);
      this.patientDataByDoctor = res
    })
    this.reportservice.getHospitalDischargeReports().subscribe((res) => {
      console.log(res);
      this.patientData = res

    })
    this.billForm = this.fb.group({
      patientName: [{ value: '' }, Validators.required],
      patientAge: [{ value: '' }, Validators.required],
      patientGender: [{ value: '' }, Validators.required],
      admissionDate: [{ value: '' }, Validators.required],
      dischargeDate: [{ value: '' }, Validators.required],
      finalDiagnosis: [{ value: '' }, Validators.required],
      summaryOfTreatment: [{ value: '' }, Validators.required],
      dischargeMedications: [{ value: '' }, Validators.required],
      followUpInstructions: [{ value: '' }, Validators.required],
      paymentType: ['cash', Validators.required],
      amount: ['', Validators.required]

    });
    this.hospitalDischargeReportForm = this.fb.group({
      patientName: ['', Validators.required],
      // patientAge: [{ value: '', disabled: true }, Validators.required],
      patientAge: ['', Validators.required],
      patientGender: ['', Validators.required],
      admissionDate: ['', Validators.required],
      dischargeDate: ['', Validators.required],
      finalDiagnosis: ['', Validators.required],
      summaryOfTreatment: ['', Validators.required],
      dischargeMedications: ['', Validators.required],
      followUpInstructions: ['', Validators.required],
      department :  ['', Validators.required],
      ward:  ['', Validators.required],
      bedNumber:  ['', Validators.required],
      bed_charges:[''],
      hospitalDischargeRequest: [true]
    },);

    this.hospitalDischargeReportForm.get('patientName')?.valueChanges.subscribe((patientId) => {
      this.onPatientSelectForAdmin(patientId);

    });
    this.fetchHospitalReports();
    this.fetchAdmittedPatients(); 
    this.fetchDischargeReports(); 


  }
  loadPrescriptions(): void {
    this.symptomsService.getPrescriptions().subscribe(
      (data) => {
        this.prescriptions = data;
      },
      (error) => {
        console.error('Error fetching prescriptions:', error);
      }
    );
  }


  fetchDischargeReports(): void {
    this.http.get<any>(this.apiUrl).subscribe(
      (reports) => {
        this.dischargeReports = reports;
        console.log(this.dischargeReports);
      },
      (error) => {
        console.error('Error fetching discharge reports:', error);
      }
    );
  }

  openModalD(report: any): void {
    this.dischargeBill = report;
    console.log('Selected report:', this.dischargeBill);
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
  // hello teyr

  openModal(report: any): void {
    this.billForm.patchValue({
      patientName: report.patientName,
      patientAge: report.patientAge,
      patientGender: report.patientGender,
      admissionDate: report.admissionDate,
      dischargeDate: report.dischargeDate,
      finalDiagnosis: report.finalDiagnosis,
      summaryOfTreatment: report.summaryOfTreatment,
      dischargeMedications: report.dischargeMedications,
      followUpInstructions: report.followUpInstructions
    });
    this.billGenerated = false; // Reset billGenerated when opening the modal
  }

  confirmBill(): void {
    if (this.billForm.valid) {
      const billData = this.billForm.value;
      console.log('Bill Data:', billData); // Check the complete bill data
      ; // Use this to step through and inspect billData
      // Handle bill data, e.g., send it to the backend
      this.billService.saveBill(billData).subscribe(
        response => {
          console.log('Bill saved successfully:', response);
          this.billGenerated = true;
          alertify.success('Cash payment processed successfully.');
        },
        error => {
          console.error('Failed to save bill', error);
          alertify.error('Failed to save bill');
          this.billGenerated = true;
          this.paidAmount = parseFloat(billData.amount);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
  // processCashPayment(): void {
  //   const formValues = this.billForm.value;
  //   const billData = {
  //     ...formValues,
  //     amountPaid: parseFloat(formValues.cashDetails),
  //     paymentType: 'cash'
  //   };
  //   console.log(billData);
  
  //   this.billService.saveBill(billData).subscribe(
  //     response => {
  //       console.log('Bill saved successfully:', response);
  //       this.billGenerated = true;
  //       alertify.success('Cash payment processed successfully.');
  //     },
  //     error => {
  //       console.error('Failed to save bill', error);
  //       alertify.error('Failed to save bill');
  //     }
  //   );
  // }
  

  // savePaymentDetails(paymentType: string, paymentData: any): void {
  //   const billData = {
  //     ...this.billForm.value,
  //     paymentType,
  //     paymentData
  //   };
  //   
  //   this.billService.saveBill(billData).subscribe(
  //     response => {
  //       console.log('Bill saved:', response);
  //       this.billGenerated = true;
  //     },
  //     error => {
  //       console.error('Failed to save bill', error);
  //     }
  //   );
  // }

  generateAndDownloadBill(billData: any): void {
    this.http.post('/api/generate-bill', billData, { responseType: 'blob' }).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hospital-bill.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        alertify.error('Failed to generate and download bill');
      }
    );
  }

  
  
  fetchAdmittedPatients(): void {
    this.reportservice.getAdmnittedPatientReports().subscribe((res) => {
      this.Admittedpatients = res.patient
    })
  }

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

  onPatientSelectForAdmin(event: Event): void {
    console.log('Event:', event); // Debugging
    const selectElement = event.target as HTMLSelectElement;

    if (!selectElement || !selectElement.value) {
      console.error('Invalid event target:', event.target);
      return;
    }

    const selectedPatientId = selectElement.value;
    console.log('Selected Patient ID:', selectedPatientId); // Debugging
    const selectedPatient = this.patientDataByDoctor?.find(patient => patient._id === selectedPatientId);

    if (selectedPatient) {
      console.log('Selected Patient:', selectedPatient); // Debugging
      this.hospitalDischargeReportForm.patchValue({
        patientName: selectedPatient.patientName,
        patientAge: selectedPatient.patientAge,
        patientGender: selectedPatient.gender,
        admissionDate: selectedPatient.admittedAt.substring(0, 10),
        dischargeDate: selectedPatient.dischargeDate?.substring(0, 10),
        finalDiagnosis: selectedPatient.diagnosis,
        summaryOfTreatment: selectedPatient.treatmentGiven,
        dischargeMedications: selectedPatient.dischargeInstructions,
        followUpInstructions: selectedPatient.followUpPlan,
        department : selectedPatient.department,
        ward: selectedPatient.ward,
        bedNumber: selectedPatient.bedNumber,
        // 


      });
    } else {
      console.error('Selected patient not found');
    }
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
    alert('button is clicked')
    const value = this.hospitalDischargeReportForm.valid
    
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
  closeModal(): void {

  }
}