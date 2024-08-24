import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/service/admin/department.service';
import { WardService } from '../../../core/service/ward-service/ward.service';
import { PatientService } from '../../../core/service/patient/patient.service';
import { BedService } from '../../../core/service/bed/bed.service';
import { ChartModule } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';
import { SymptomsService } from '../../../core/service/symptoms/symptoms.service';
import { CommonModule } from '@angular/common';


// import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userRole: string | null | undefined;
  departmentCount: number | undefined;
  wardCount!: number;
  symptomsCount!: number;
  occupiedBeds!: number;
  unoccupiedBeds!: number;
  bedCount!: number;
  dailyAdmittedPatients!: number;
  patientCount!: number;
  wardsChart: Chart | undefined;
  departmentsChart: Chart | undefined;
  doctorPatientCount: number = 0;
  admissionsChart: Chart | undefined;
  bedsChart: Chart | undefined;
  statsPieChart: Chart | undefined;
  constructor(
    private departmentService: DepartmentService,
    private patientService: PatientService,
    private bedService: BedService,
    private wardService: WardService,
    private symptomsService: SymptomsService
  ) {}

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole')

    this.departmentService.getDepartment().subscribe((res) => {
      this.departmentCount = res.departmentCount;
      this.createDepartmentsChart();
      this.createWardsChart();

    });

    this.patientService.getAllPatientsAdmission().subscribe((data) => {
      this.dailyAdmittedPatients = data.dailyAdmittedPatients;
      this.patientCount = data.patientCount;
      this.createAdmissionsChart();
    });
    this.patientService.getDashboardCounts().subscribe(data => {
      this.doctorPatientCount = data.count;
    });
    this.wardService.getAllWardsCount().subscribe(data => {
      this.wardCount = data.count;
    });
    this.symptomsService.getSymptomsCount().subscribe(data => {
      this.symptomsCount = data.count;
    });
    this.bedService.getBedsCounts().subscribe((data) => {
      this.occupiedBeds = data.occupiedBeds;
      this.unoccupiedBeds = data.unoccupiedBeds;
      this.bedCount = data.bedCount;
      this.createBedsChart();
      this.createDepartmentsChart();
      this.createStatsPieChart(); 
      debugger
    });
  }

  createAdmissionsChart(): void {
    this.admissionsChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Admissions Statistics'
      },
      series: [{
        type: 'pie',
        name: 'Admissions',
        data: [
          { name: 'Daily Admissions', y: this.dailyAdmittedPatients },
          { name: 'Total Admissions', y: this.patientCount }
        ]
      }]
    });
  }

  createBedsChart(): void {
    this.bedsChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Beds Statistics'
      },
      series: [{
        type: 'pie',
        name: 'Beds',
        data: [
          // { name: 'Total Beds', y: this.bedCount },
          { name: 'Occupied Beds', y: this.occupiedBeds,color: '#FF5733' },
          { name: 'Unoccupied Beds', y: this.unoccupiedBeds ,    color: '#33FF57'}
        ]
      }]
    });
  }
  createStatsPieChart(): void {
    // Create pie chart for departments, patients, wards, and symptoms
    this.statsPieChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Overall Statistics'
      },
      series: [{
        type: 'pie',
        name: 'Data',
        data: [
          { name: 'Total Departments', y: this.departmentCount || 0, color: '#1f77b4' },
          { name: 'Total Patients', y: this.patientCount || 0, color: '#ff7f0e' },
          { name: 'Total Wards', y: this.wardCount || 0, color: '#2ca02c' },
          { name: 'Total Symptoms Requests', y: this.symptomsCount || 0, color: '#d62728' }
        ]
      }]
    });
  
}
  createWardsChart(): void {
    this.wardsChart = new Chart({
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Wards Statistics'
      },
      series: [{
        type: 'pie',
        name: 'Wards',
        data: [
          { name: 'Total Wards', y: this.wardCount }
        ]
      }]
    });
  }

  // createDepartmentsChart(): void {
  //   this.departmentsChart = new Chart({
  //     chart: {
  //       type: 'bar'
  //     },
  //     title: {
  //       text: 'Departments Statistics'
  //     },
  //     series: [{
  //       type: 'bar',
  //       name: 'Departments',
  //       data: [
  //         { name: 'Total Departments', y: this.departmentCount },
  //         { name: 'Total Wards', y: this.wardCount }
  //       ]
  //     }]
  //   });
  // }
  createDepartmentsChart(): void {
    // Ensure default values if data is not available
   
    this.departmentsChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Departments and Beds Statistics'
      },
      xAxis: {
        categories: ['Departments', 'Beds'],
        title: {
          text: 'Categories'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Count'
        },
        labels: {
          overflow: 'justify'
        }
      },
      series: [{
        type: 'bar',
        name: 'Count',
        data: [
          { name: 'Total Departments', y: this.departmentCount, color: '#1f77b4' },
          { name: 'Total Beds', y: this.bedCount, color: '#ff7f0e' }
        ]
      }]
    });
  }
  
 
}