import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/service/admin/department.service';
import { WardService } from '../../../core/service/ward-service/ward.service';
import { PatientService } from '../../../core/service/patient/patient.service';
import { BedService } from '../../../core/service/bed/bed.service';
import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
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
  this.bedService.getBedsCounts().subscribe((data)=>{
    this.occupiedBeds = data.occupiedBeds;
    this.unoccupiedBeds = data.unoccupiedBeds;
    this.bedCount = data.bedCount;
  })
  this.createChart();
  this.createDoughnutChart()
}
createDoughnutChart(): void {
  const ctx = document.getElementById('doughnutChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}
createChart(): void {
  const ctx = document.getElementById('myChart') as HTMLCanvasElement;
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Daily Admitted Patients', 'Total Patients'],
      datasets: [
        {
          data: [this.dailyAdmittedPatients, this.patientCount],
          backgroundColor: [
           'rgba(255, 192, 203, 1)', // Pastel pink
            'rgba(50, 205, 50, 1)'
          ],
          borderColor: [
            'rgba(255, 192, 203, 1)', // Pastel pink
            'rgba(50, 205, 50, 1)'
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Patient Admissions'
        }
      }
    }
  });
}
}