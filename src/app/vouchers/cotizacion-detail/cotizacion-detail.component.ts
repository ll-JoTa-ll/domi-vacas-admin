import { Component, OnInit } from '@angular/core';
import { SessionService } from '../shared/session.service';

@Component({
  selector: 'app-cotizacion-detail',
  templateUrl: './cotizacion-detail.component.html',
  styleUrls: ['./cotizacion-detail.component.css']
})
export class CotizacionDetailComponent implements OnInit {


  dataCoti;
  dataSource;
  dataServices;
  displayedService: string[] = [ 'tipo', 'destino', 'fechaInicio', 'fechaFin', 'precioBase','cargos','moneda','detalle','isActive'];
  displayedColumns: string[] = [ 'nombres', 'apellidos', 'tipoDocumento', 'numeroDocumento', 'correo','telefono','tipoPax','fechaNacimiento','isActive'];
  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.dataCoti = this.sessionService.getCotizacionDetail();
    this.dataSource = this.dataCoti.lcotizacionesPasajeros;
    this.dataServices = this.dataCoti.lcotizacionesServicios;
  }

}
