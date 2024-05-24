import { FormsModule, NgForm } from '@angular/forms';
import { LoginService } from './../services/login.service';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { EmpleadoLoginDto } from '../dtos/empleadoLoginDto';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,HttpClientModule, CommonModule,ToastrModule],
  providers: [HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  credentials: EmpleadoLoginDto = new EmpleadoLoginDto();

  constructor(private loginService: LoginService, private toastr: ToastrService, private router: Router) { }

  login(form: NgForm) {
    this.credentials.email = form.value.email;
    this.credentials.contrasena = form.value.contrasena;

    this.loginService.login(this.credentials).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        this.toastr.success('Sesion iniciada');
        this.router.navigate(['/productos']);

      },
      error => {
        this.toastr.error(error.error.message);
        console.error(error);
      }
    );
  }
}
