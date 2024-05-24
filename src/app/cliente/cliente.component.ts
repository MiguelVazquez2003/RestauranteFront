import { Component } from '@angular/core';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {

  constructor(private clienteService: ClienteService) {
    this.clienteService.getClientes().subscribe(
      data => console.log(data),
      error => console.error(error)
    );
}
}
