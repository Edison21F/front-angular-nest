import { Component, inject, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2'

interface Categoria {
  id: number;
  nombre: string;
  detalle:string;
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
  categoria_id:number=-1;
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
      this.categoriaService.funModificar(this.categoria_id,this.categoriaForm.value).subscribe(
        (res:any) => {
          this.visible = false;
          this.getCategoria(); // Recargar las categorías después de guardar
          this.categoria_id=-1

          Swal.fire({
            title:"En hora buena",
            text: "La categoria se modifico con éxito!",
            icon: "success"
          })

        },
        (err:any) => {
          console.error('Error al guardar la categoría', err);
        }
      );
    } else {
      this.categoriaService.funGuardar(this.categoriaForm.value).subscribe(
        (res:any)=>{
          this.visible=false;
          this.getCategoria();

          Swal.fire({
            title:"Registrado",
            text:"La categoria se creó con éxito!",
            icon:"success"
          })

        },
        (error:any)=>{
          console.log(error)
        }
      )
    }
    this.categoriaForm.reset();
  }

  editarCategoria(cat:Categoria){
    this.visible=true
    this.categoria_id=cat.id
    this.categoriaForm.setValue({nombre: cat.nombre, detalle: cat.detalle})
  }

  eliminarCategoria(cat:Categoria){
    Swal.fire({
      title: '¿Estás seguro de eliminar la categoría?',
      text: 'No podrás recuperarla después de eliminarla',
      icon: 'warning',

      confirmButtonColor:"#3085d6",
      cancelButtonColor:"#d33",
      confirmButtonText: "Si.eliminar!"
    }).then((result)=>{
      if(result.isConfirmed){
        this.categoriaService.funEliminar(cat.id).subscribe(
          (res:any)=>{
            Swal.fire({
              title:"Eliminado",
              text:"La categoría se eliminó",
              icon:"success"
            });
            this.getCategoria();
            this.categoria_id=-1
          },
          (error:any)=>{
            Swal.fire({
              title:"Error",
              text:"No se pudo eliminar la categoría",
              icon:"error"
            })
          }
        )
      }
    })
  }

  alerta(title:string,text:string,icon:'success'|'error'|'info'|'question'){
    Swal.fire({title,text,icon
      //title:title,
      //text:text,
      //icon:icon
    })
  }

}
