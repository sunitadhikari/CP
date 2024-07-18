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
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private doctorService:DoctorService,private departmentService:DepartmentService, private userService : UserService) {

   }

  ngOnInit(): void {
    this.doctorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      department: [''],
      picture: [''],
      dob: [''],
      sex: ['', Validators.required],
      bloodGroup: [''],
      specialist: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: [''],
      mobileNo: ['', Validators.required],
      careerTitle: ['', Validators.required],
      biography: [''],
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
  onSubmit() {
   
    if(this.doctorForm.valid){
      this.userService.postRegister(this.doctorForm.value).subscribe((data)=>{
        
       console.log(data);
       alertify.success('Doctor Added Successfully')
       
       this.doctorForm.reset()
      })

    }
    else{
      alertify.error('Invalid Form')
    }

    
  }
  edit(doctor:any):void{
// this.editDoctorId = doctor._id;
this.doctorForm.patchValue({
  firstName:doctor.firstName,
  lastName:doctor.lastName,
  email:doctor.email,
  password:doctor.password,
  confirmPassword:doctor.confirmPassword,
  department:doctor.department,
  picture:doctor.picture,
  dob:doctor.dob,
  sex:doctor.sex,
  bloodGroup:doctor.bloodGroup,
  specialist:doctor.specialist,
  address:doctor.address,
  phoneNo:doctor.phoneNo,
  mobileNo:doctor.mobileNo,
  careerTitle:doctor.careerTitle,
  biography:doctor.biography,
  status:doctor.status,
  role:doctor.role,

})
  }
  cancelEdit():void{
    // this.editDoctorId= null;
    this.doctorForm.reset();
  }
  delete(id: string): void {
    this.doctorService.deleteDoctor(id).subscribe(
      res => {
        alertify.success('Successfully deleted');
        this.getDoctorList();
        console.log('Doctor Deleted:', res);
      },
      error => {
        console.log('Error deleting doctor:', error);
      }
    );
  }

}