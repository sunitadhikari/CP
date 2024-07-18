import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/service/admin/department.service';
import { WardService } from '../../../core/service/ward-service/ward.service';
import { PatientService } from '../../../core/service/patient/patient.service';
import { BedService } from '../../../core/service/bed/bed.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  departmentCount: number | undefined;
  wardCount!: number;
  occupiedBeds!: number;
  unoccupiedBeds!: number;
  bedCount!: number;
  dailyAdmittedPatients!: number;
  patientCount!: number;
  constructor(private departmentService:DepartmentService,
    private patientService:PatientService,
    private bedService:BedService,
    private wardService:WardService
  ){}
ngOnInit(): void {
  this.departmentService.getDepartment().subscribe((res)=>{
    console.log(res);
    this.departmentCount = res.departmentCount;
    
  })
  // this.wardService.getAllWards().subscribe((res:WardResponse) => {
  //   // this.wards = res.wards;
  //   this.wardCount = res.wardCount;
  // });
  this.patientService.getAllPatientsAdmission().subscribe((data)=>{
    this.dailyAdmittedPatients = data.dailyAdmittedPatients;
    this.patientCount = data.patientCount;
    
  })
  this.bedService.getBeds().subscribe((data)=>{
    this.occupiedBeds = data.occupiedBeds;
    this.unoccupiedBeds = data.unoccupiedBeds;
    this.bedCount = data.bedCount;
  })
}


}
