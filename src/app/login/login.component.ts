import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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

  constructor(private http: HttpClient, private router: Router) {}

  async OnSubmit(form: NgForm) {
    if (form.invalid) {
      console.log("Form Invalid");
      form.control.markAllAsTouched();
      return;
    }
    try {
      const response = await this.http.post('http://localhost:3000/api/login', this.model).toPromise();
      console.log(response);
      alert('Login Successful!');
      await this.router.navigate(['/landingpage']); // Redirect after login
    } catch (error: any) {
      alert('Login Failed: ' + error.error.message);
    }
  }
}
