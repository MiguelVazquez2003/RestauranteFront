import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductoComponent } from './producto/producto.component';
import { AuthGuardService } from './services/auth-guard.service';
import { EmpleadoComponent } from './empleado/empleado.component';
import { TurnoComponent } from './turno/turno.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { CapacitacionComponent } from './capacitacion/capacitacion.component';
import { CapacitacionEmpleadoComponent } from './capacitacion-empleado/capacitacion-empleado.component';
import { ExamenComponent } from './examen/examen.component';

export const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  { path: 'productos' , component: ProductoComponent, canActivate: [AuthGuardService] },
  {path:'empleados', component: EmpleadoComponent, canActivate: [AuthGuardService]},
  {path:'turnos', component: TurnoComponent, canActivate: [AuthGuardService]},
  {path:'proveedores', component: ProveedorComponent, canActivate: [AuthGuardService]},
  {path:'capacitaciones', component: CapacitacionComponent, canActivate: [AuthGuardService]},
  {path:'capacitacion-empleado', component: CapacitacionEmpleadoComponent, canActivate: [AuthGuardService]},
  {path:'examen', component: ExamenComponent, canActivate: [AuthGuardService]}
];
