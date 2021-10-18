import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: [
  ]
})
export class ItemComponent implements OnInit {

  producto!: ProductoDescripcion;
  id!: string;
  constructor( private route: ActivatedRoute,
                public productoService: ProductosService ) { }

  ngOnInit(): void {
    this.route.params // Para recibir el /:id
      .subscribe( parametros => {
        this.productoService.getProducto( parametros['id'] )
            .subscribe( producto => {
              this.producto = producto;
              this.id = parametros['id'];
            })

      })
  }

}
