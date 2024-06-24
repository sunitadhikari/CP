import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-report.component.html',
  styleUrl: './dashboard-report.component.css'
})
export class DashboardReportComponent implements OnInit{
  userRole:string|null |undefined;

  ngOnInit(): void {
    this.userRole= localStorage.getItem('userRole')
}
}
