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
  services = [
    {
      title: 'Service 1',
      description: 'Description of service 1. This service offers comprehensive healthcare solutions.',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: 'Service 2',
      description: 'Description of service 2. This service provides specialized care for all patients.',
      image: 'https://via.placeholder.com/150'
    },
    {
      title: 'Service 3',
      description: 'Description of service 3. We offer advanced medical treatments and procedures.',
      image: 'https://via.placeholder.com/150'
    }
  ];
}
