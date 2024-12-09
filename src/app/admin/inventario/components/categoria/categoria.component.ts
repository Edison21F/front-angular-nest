import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';

interface Categoria {
  id?: number;
  nombre: string;
  detalle?:string;
}
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent implements OnInit {

  private categoriaService = inject(CategoriaService)
  categorias: Categoria[] = [];
  visible:boolean=false;
  categoriaForm= new FormGroup({
    nombre: new FormControl(''),
    detalle: new FormControl('')
  });

  ngOnInit(): void {
      this.getCategoria()
  }
  getCategoria(){
    this.categoriaService.funListar().subscribe(
      (res:any)=>{
        this.categorias = res;
      },
      (err:any)=>{
        console.log(err);
      }
    )
  }

  mostrarDialog(){
    this.visible=true
  }

  guardarCategoria(){
    if (this.categoriaForm.valid) { // Verificar si el formulario es válido
      this.categoriaService.funGuardar(this.categoriaForm.value).subscribe(
        (res:any) => {
          this.visible = false;
          this.getCategoria(); // Recargar las categorías después de guardar
        },
        (err:any) => {
          console.error('Error al guardar la categoría', err);
        }
      );
    } else {
      console.warn('Formulario inválido');
    }
  }
  

}
