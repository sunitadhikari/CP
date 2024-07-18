import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../../../core/service/admin/doctor.service';
import * as alertify from 'alertifyjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/service/user/user.service';
import { DepartmentService } from '../../../core/service/admin/department.service';


@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css'
})
export class DoctorComponent  implements OnInit {
  doctorForm!: FormGroup;
  doctorList : any[] =[];
  departmentList : any[] =[];
  editingDoctor: any = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private doctorService:DoctorService,private departmentService:DepartmentService, private userService : UserService) {

   }

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      department: ['',Validators.required],
      picture: [''],
      dob: ['',Validators.required],
      sex: ['', Validators.required],
      bloodGroup: ['',Validators.required],
      specialist: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: [''],
      mobileNo: ['', Validators.required],
      careerTitle: ['', Validators.required],
      biography: ['',Validators.required],
      status: ['active', Validators.required],
      role:['doctor']
    });
    this.getDoctorList();
    this.getDepartmentListData()

  }
getDepartmentListData(){
  this.departmentService.getDepartment().subscribe((data)=>{
    console.log(data);
    this.departmentList=data
  })
}
  getDoctorList(){
    this.doctorService.getDoctor().subscribe((data)=>{
      // console.log(data);
      this.doctorList=data.doctors;
      console.log(this.doctorList);

    })
  }
  // onSubmit() {
   
  //   if(this.doctorForm.valid){
  //     this.userService.postRegister(this.doctorForm.value).subscribe((data)=>{
  //       debugger
  //      console.log(data);
  //      alertify.success('Doctor Added Successfully')
  //      debugger
  //      this.doctorForm.reset()
  //     })

  //   }
  //   else{
  //     alertify.error('Invalid Form')
  //   }

    
  // }
  onSubmit(): void {
    if (this.doctorForm.valid) {
      if (this.editingDoctor) {
        this.updateDoctor();
      } else {
        this.createDoctor();
      }
    } else {
      alertify.error('Invalid Form');
    }
  }

  createDoctor(): void {
    this.userService.postRegister(this.doctorForm.value).subscribe(
      (data) => {
        alertify.success('Doctor Added Successfully');
        this.doctorForm.reset();
        this.getDoctorList();
      },
      (error) => {
        console.error('Error creating doctor:', error);
        alertify.error('Failed to create doctor');
      }
    );
  }

  updateDoctor(): void {
    this.userService.updateUser(this.editingDoctor._id, this.doctorForm.value).subscribe(
      (data) => {
        alertify.success('Doctor updated successfully');
        this.editingDoctor = null;
        this.doctorForm.reset();
        this.getDoctorList();
      },
      (error) => {
        console.error('Error updating doctor:', error);
        alertify.error('Failed to update doctor');
      }
    );
  }

  // updateDoctor(): void {
  //   this.userService.updateUser(this.editingDoctor._id, this.doctorForm.value).subscribe(
  //     (data) => {
  //       alertify.success('Doctor updated successfully');
  //       this.editingDoctor = null;
  //       this.doctorForm.reset();
  //       this.getDoctorList();
  //     },
  //     (error) => {
  //       console.error('Error updating doctor:', error);
  //       alertify.error('Failed to update doctor');
  //     }
  //   );
  // }

  editDoctor(doctor: any): void {
    this.editingDoctor = doctor;
    this.doctorForm.patchValue({
      firstName: doctor.firstName,
      lastName: doctor.lastName,
      email: doctor.email,
      department: doctor.department,
      picture: doctor.picture,
      dob: doctor.dob,
      sex: doctor.sex,
      bloodGroup: doctor.bloodGroup,
      specialist: doctor.specialist,
      address: doctor.address,
      phoneNo: doctor.phoneNo,
      mobileNo: doctor.mobileNo,
      careerTitle: doctor.careerTitle,
      biography: doctor.biography,
      status: doctor.status
    });
  }

  delete(id: string): void {
    this.userService.deleteUser(id).subscribe(
      (res) => {
        alertify.success('Successfully deleted');
        this.getDoctorList();
        console.log('Doctor Deleted:', res);
      },
      (error) => {
        console.error('Error deleting doctor:', error);
        alertify.error('Failed to delete doctor');
      }
    );
  }
}