import { DatePipe } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConvenioService } from "src/services/convenio.service";


@Component({
  selector: 'app-convenio-detalle',
  templateUrl: './convenio-detalle.component.html',
  styleUrls: ['./convenio-detalle.component.css'],
})
export class ConvenioDetalleComponent {
  data: any = {};

  constructor(
    private route: ActivatedRoute,
    private convenioService: ConvenioService, private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Obtén los datos de la ruta
    this.route.params.subscribe(params => {
      const convenioId = params['id'];
      this.loadConvenioDetails(convenioId);
    });
  }

  loadConvenioDetails(convenioId: string): void {
    this.convenioService.getConvenioDetails(convenioId).subscribe({
      next: (res) => {
        this.data = res;
        console.log('Datos en el componente de página:', this.data);
      },
      error: console.error,
    });
  }

}
