import { Component } from '@angular/core';
import { SharedTableComponent } from '../../shared/sharedComponent/shared-table/shared-table.component';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [SharedTableComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  tableColumn=[
    { field: 'id', header: 'ID' },
    { field: 'patient', header: 'Patient' },
    { field: 'date', header: 'Date' },
    { field: 'Content', header: 'Content' }
   ];
  tableNotes = [
    { id: 1, patient: 'John Doe', date: '2024-06-18', content: 'Patient has a mild fever.' },
    { id: 2, patient: 'Jane Smith', date: '2024-06-19', content: 'Patient complained of headache.' }

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
