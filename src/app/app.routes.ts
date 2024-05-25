import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductoComponent } from './producto/producto.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EmpleadoComponent } from './empleado/empleado.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  { path: 'productos' , component: ProductoComponent, canActivate: [AuthGuardService] },
  {path:'empleados', component: EmpleadoComponent, canActivate: [AuthGuardService]}
];
