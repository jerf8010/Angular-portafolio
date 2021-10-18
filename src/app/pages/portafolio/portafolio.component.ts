import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styles: [
    `
    svg path,
    svg rect{
      fill: black;
    }
    `
  ]
})
export class PortafolioComponent implements OnInit {

  constructor( public productoService: ProductosService) { 
  }

  ngOnInit(): void {
  }

}
