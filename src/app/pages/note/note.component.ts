import { Component, OnInit } from '@angular/core';
import { SharedTableComponent } from '../../shared/sharedComponent/shared-table/shared-table.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorNoteService } from '../../core/service/doctorNote/doctor-note.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [SharedTableComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {
  noteForm!: FormGroup
  userRole: String | null | undefined
  noteTable :any[]=[]
  doctorNoteTable :any[]=[]
  doctorNoteDoctorTable :any[]=[]
  constructor(private fb: FormBuilder, private doctorNoteService: DoctorNoteService) { }

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      doctor:[''],
      patient: ['', Validators.required],
      date: ['', Validators.required],
      content: ['', Validators.required],
    })
    this.userRole = localStorage.getItem('userRole')
    this.getNote()
  }
  submit() {
    if (this.noteForm.valid) {
      this.doctorNoteService.postDoctor(this.noteForm.value).subscribe((data) => {
        console.log('Form filled successfully');
        alertify.success('Note sent successfully')
        this.noteForm.reset();
      })
    }
    else {
      alertify.error('Form Invalid')
    }
  }

getNote(){
  this.doctorNoteService.getDoctor().subscribe((data)=>{
    this.noteTable= data
  })
}
getDoctorByEmail(){
  this.doctorNoteService.getDoctorByEmail().subscribe((data)=>{
    this.doctorNoteTable = data
  })
}
getDoctorNoteByDoctor(){
  this.doctorNoteService.getDoctorByDoctor().subscribe((data)=>{
    this.doctorNoteDoctorTable = data
  })
}
  edit(){
    console.log('Editks item:');
  }

  delete() {
    console.log('Delete item:');
  }

}
