import { Component } from '@angular/core';
import { ProfilComponent } from "../profil/profil.component";

@Component({
    selector: 'app-setting',
    standalone: true,
    templateUrl: './setting.component.html',
    styleUrl: './setting.component.css',
    imports: [ProfilComponent]
})
export class SettingComponent {

}
