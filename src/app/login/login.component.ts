import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule, NgForm} from '@angular/forms';
import {RouterLink, RouterOutlet} from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}
  OnSubmit(form: NgForm) {
    if (form.invalid) {
      console.log("Form Invalid");
      form.control.markAllAsTouched();
      return;
    }
    this.http.post('http://localhost:3000/api/login', this.model)
      .subscribe({
        next: (response) => console.log("Form Submitted Successfully", response),
        error: (error) => console.error("Error Submitting Form", error)
      });
  }


}
