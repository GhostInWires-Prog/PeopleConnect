import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { HttpClient } from '@angular/common/http';

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
    fullname: '',
    confirmPassword: ''  // Keep the confirmPassword for validation
  };

  constructor(private http: HttpClient) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      console.log('Form Invalid');
      form.control.markAllAsTouched();
      return;
    }

    // Confirm Password Validation
    if (this.model.password !== this.model.confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    // Prepare registration data (no confirmPassword needed for backend)
    const registration = {
      email: this.model.email,
      password: this.model.password,
      fullname: this.model.fullname,
    };

    // Make the HTTP POST request
    this.http.post('http://localhost:3000/api/register', registration)
      .subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });
  }
}
