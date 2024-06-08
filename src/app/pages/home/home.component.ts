import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, MatIconModule, NavbarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
