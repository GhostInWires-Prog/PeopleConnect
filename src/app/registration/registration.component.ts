// registration.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-registration',
  standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  model: any = {
    email: '',
    password: '',
    confirmPassword: '',
    fullname: '',
  };

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('Form Invalid');
      form.control.markAllAsTouched();
      return;
    }
    if (this.model.password !== this.model.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    console.log('Form Submitted', this.model);
  }
}
