import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../../core/service/admin/department.service';
import { WardService } from '../../../core/service/ward-service/ward.service';
import { PatientService } from '../../../core/service/patient/patient.service';
import { BedService } from '../../../core/service/bed/bed.service';
import { ChartModule } from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import { Chart } from 'angular-highcharts';


// import { Chart, ChartConfiguration, ChartData, ChartType } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  departmentCount: number | undefined;
  wardCount!: 3;
  occupiedBeds!: number;
  unoccupiedBeds!: number;
  bedCount!: number;
  dailyAdmittedPatients!: number;
  patientCount!: number;
  wardsChart: Chart | undefined;
  departmentsChart: Chart | undefined;

  admissionsChart: Chart | undefined;
  bedsChart: Chart | undefined;

  constructor(
    private departmentService: DepartmentService,
    private patientService: PatientService,
    private bedService: BedService,
    private wardService: WardService
  ) {}

  ngOnInit(): void {
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

    this.bedService.getBedsCounts().subscribe((data) => {
      this.occupiedBeds = data.occupiedBeds;
      this.unoccupiedBeds = data.unoccupiedBeds;
      this.bedCount = data.bedCount;
      this.createBedsChart();
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
          { name: 'Total Beds', y: this.bedCount },
          { name: 'Occupied Beds', y: this.occupiedBeds },
          { name: 'Unoccupied Beds', y: this.unoccupiedBeds }
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

  createDepartmentsChart(): void {
    this.departmentsChart = new Chart({
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Departments Statistics'
      },
      series: [{
        type: 'bar',
        name: 'Departments',
        data: [
          { name: 'Total Departments', y: this.departmentCount },
          { name: 'Total Wards', y: this.wardCount }
        ]
      }]
    });
  }
}