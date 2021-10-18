import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    return new Promise( (resolve, reject ) => {

      this.http.get<Producto[]>('https://angulat-html-263b5-default-rtdb.firebaseio.com/productos_idx.json') 
      .subscribe( ( resp ) => {
        this.cargando = false;
        
        this.productos = resp;
        resolve;
       
      });
    });
    
  }

  getProducto( id: string ): Observable<ProductoDescripcion>{
    return this.http.get<ProductoDescripcion>(`https://angulat-html-263b5-default-rtdb.firebaseio.com/productos/${ id }.json`)

  }

  buscarProducto( termino: string ){

    if( this.productos.length === 0){
      this.cargarProductos()
          .then( () => {
            this.filtrarProductos( termino );
          });

    }else {
      this.filtrarProductos( termino );
    }
    
    console.log(this.productosFiltrado)
  }

  private filtrarProductos( termino: string ){
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0){
        this.productosFiltrado.push( prod );
      }
    })
  }
}
