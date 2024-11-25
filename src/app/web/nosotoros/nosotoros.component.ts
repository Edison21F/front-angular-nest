import { Component } from '@angular/core';

@Component({
  selector: 'app-nosotoros',
  imports: [],
  template: `
   <h1>{{titulo}}</h1>
   <p>Esta es la página de Nosotros</p>
  `,
  styles: `
  h1{
    color: #00f;
  }
  `
})
export class NosotorosComponent {
public titulo:string="Acerca de nostros"
}
