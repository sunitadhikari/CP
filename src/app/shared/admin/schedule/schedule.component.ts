import { Component } from '@angular/core';
import { SharedTableComponent } from '../../sharedComponent/shared-table/shared-table.component';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  appointments = [
    { id: 1, patient: 'John Doe', Doctor: 'Dr. Smith', date: '2024-06-18', Time: '10:00 AM', Status: 'Scheduled' },
    { ID: 2, patient: 'Jane Smith', Doctor: 'Dr. Johnson', date: '2024-06-19', Time: '11:00 AM', Status: 'Confirmed' }
  ];
  tableColumns = [
    { field: 'id', header: 'ID' },
    { field: 'patient', header: 'Patient' },
    { field: 'Doctor', header: 'Doctor' },
    { field: 'date', header: 'Date' },
    { field: 'Time', header: 'Time' },
    { field: 'Status', header: 'Status' },
    ];
  actions = [
    { label: 'Edit', action: this.editItem },
    { label: 'Delete', action: this.deleteItem }
  ];

  editItem(row: any) {
    console.log('Editks item:', row);
  }

  deleteItem(row: any) {
    console.log('Delete item:', row);
  }
}