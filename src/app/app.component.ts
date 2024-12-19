import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LandingpageComponent} from './landingpage/landingpage.component';
import {RegistrationComponent} from './registration/registration.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent, LandingpageComponent, RegistrationComponent],
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebProject';
}
