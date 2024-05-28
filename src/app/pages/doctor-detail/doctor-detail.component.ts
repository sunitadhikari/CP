import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
    selector: 'app-doctor-detail',
    standalone: true,
    templateUrl: './doctor-detail.component.html',
    styleUrl: './doctor-detail.component.css',
    imports: [NavbarComponent, FooterComponent]
})
export class DoctorDetailComponent {

}
