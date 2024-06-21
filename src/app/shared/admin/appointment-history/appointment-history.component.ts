import { CommonModule } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { AppointmentService } from '../../../core/service/appointment/appointment.service';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-appointment-history',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.css'
})

export class AppointmentHistoryComponent implements OnInit {
appointmentTable : any[] =[]
  constructor(private appointmentService :AppointmentService) { }
  // transform(value: string, limit:number=10): string {
  //   if(!value){
  //     return '';
  //   }
  //   const words = value.split(' ');
  //    if (words.length <= limit) {
  //     return value;
  //   }
  //   return words.slice(0, limit).join(' ') + '...';
  // }
  
  ngOnInit(): void {
this.appointment()
  }
  appointment(){
    this.appointmentService.getAppointment().subscribe((data)=>{
      console.log('Data fetched');
      this.appointmentTable = data
    })
  }
  edit(){}
  delete(){}
}
