import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/service/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  userProfile: any; // Adjust the type based on your profile structure

  constructor(private profileService: UserService) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.profileService.getProfile().subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching profile:', error);
      }
    );
  }
}