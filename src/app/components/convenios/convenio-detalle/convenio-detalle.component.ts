import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'app-convenio-detalle',
  templateUrl: './convenio-detalle.component.html',
  styleUrls: ['./convenio-detalle.component.css'],
})
export class ConvenioDetalleComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
