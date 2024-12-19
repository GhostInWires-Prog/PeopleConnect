import { Routes } from '@angular/router';
import {LandingpageComponent} from './landingpage/landingpage.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';

export const routes: Routes = [
  { path: 'landingpage',component:LandingpageComponent},
  {path:'registration',component:RegistrationComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login',component:LoginComponent},


];
