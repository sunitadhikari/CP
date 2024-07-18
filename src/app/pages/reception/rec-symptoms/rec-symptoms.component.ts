import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SymptomsService } from '../../../core/service/symptoms/symptoms.service';

@Component({
  selector: 'app-rec-symptoms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rec-symptoms.component.html',
  styleUrl: './rec-symptoms.component.css'
})
export class RecSymptomsComponent implements OnInit {
  constructor(private symptomsService:SymptomsService){}
  symptomsData :any[]=[]
  ngOnInit(): void {
      this.getSymptoms()
  }
getSymptoms(){
  this.symptomsService.getSymptoms().subscribe((res)=>{
    console.log(res);
    this.symptomsData = res;
  })
}
assignDoctor(){}
getDoctor(){
  // this.doctor
}


}
