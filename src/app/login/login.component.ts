import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NgOptimizedImage, RouterLink, RouterOutlet],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model: any = {
    title: '',
    email: '',
    password: ''
  };
  OnSubmit(form: NgForm) {
    if (form.invalid) {
      console.log("Form Invalid");
      form.control.markAllAsTouched();
      return;
    }
    console.log("Form Submitted", this.model);
  }

}
