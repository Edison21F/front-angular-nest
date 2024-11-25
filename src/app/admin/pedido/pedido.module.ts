import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPedidoComponent } from './components/listar-pedido/listar-pedido.component';
import { NuevoPedidoComponent } from './components/nuevo-pedido/nuevo-pedido.component';



@NgModule({
  declarations: [
    ListarPedidoComponent,
    NuevoPedidoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PedidoModule { }
