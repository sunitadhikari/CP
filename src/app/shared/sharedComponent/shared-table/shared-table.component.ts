import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-table.component.html',
  styleUrl: './shared-table.component.css'
})
export class SharedTableComponent {
  @Input() columns: { field: string, header: string }[] = [];
  @Input()  data: any[] = [];
  @Input() actions: { label: string, action: (row: any) => void }[] = [];
  constructor(){}


}
