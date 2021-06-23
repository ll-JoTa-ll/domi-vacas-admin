import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogAddPassengerComponent } from 'src/app/shared/components/dialog-add-passenger/dialog-add-passenger.component';
import { DialogAddServiceComponent } from 'src/app/shared/components/dialog-add-service/dialog-add-service.component';
import { SessionService } from '../shared/session.service';
import { VoucherService } from '../shared/voucherService.model';

@Component({
  selector: 'app-cotizacion-detail',
  templateUrl: './cotizacion-detail.component.html',
  styleUrls: ['./cotizacion-detail.component.css'],
  providers: [DialogAddPassengerComponent, NgxSpinnerService]
})
export class CotizacionDetailComponent implements OnInit {


  dataCoti;
  bookingForm: FormGroup;
  dataSource;
  dataServices;
  boolCoti = true;
  boolService = true;
  displayedService: string[] = ['tipo', 'destino', 'fechaInicio', 'fechaFin', 'precioBase', 'cargos', 'moneda', 'detalle', 'isActive','edit'];
  displayedColumns: string[] = ['nombres', 'apellidos', 'tipoDocumento', 'numeroDocumento', 'correo', 'telefono', 'tipoPax', 'fechaNacimiento', 'isActive','edit'];
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  constructor(private fb: FormBuilder,private spinner: NgxSpinnerService ,public dialog: MatDialog, private sessionService: SessionService,
    private voucherService: VoucherService, private route : Router,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.initForm();
    this.dataCoti = this.sessionService.getCotizacionDetail();
    this.dataSource = this.dataCoti.lcotizacionesPasajeros;
    this.dataServices = this.dataCoti.lcotizacionesServicios;
  }

  showDialogPassenger() {
    this.boolCoti = false;
    const dialogRef = this.dialog.open(DialogAddPassengerComponent, {
      data: null,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != undefined) {
        this.anadirPasajero(result);
      } else {
        this.boolCoti = true;
      }

    });


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  showDialogPassengerEdit(valor) {
    this.boolCoti = false;
    const dialogRef = this.dialog.open(DialogAddPassengerComponent, {
      data: valor,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null && result != undefined) {
        this.dataSource.forEach(element => {
          if (element.cotizacionesPasajeroId === valor.cotizacionesPasajeroId) {
            element.apellidos = result.value.apellidos;
            element.correo = result.value.correo;
            element.isActive = result.value.activo;
            element.fechaNacimiento = result.value.fechaNac.toISOString();
            element.lpasajerosVouchers = result.value.lvoucher;
            element.nombres = result.value.nombre;
            element.numeroDocumento = result.value.numeroDoc;
            element.telefono = result.value.telefono;
            element.tipoDocumento = result.value.tipoDoc;
            element.tipoPax = result.value.tipoPas;
          }
      });
      this.boolCoti = true;
      } else {
        this.boolCoti = true;
      }
      
    });


  }

  voucher(){
    this.route.navigate(['voucher-list']);
  }

  showDialogServiceEdit(valor) {
    this.boolService = false;
    const dialogRef = this.dialog.open(DialogAddServiceComponent, {
      data: valor,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if (result != null && result != undefined) {
        this.dataServices.forEach(element => {
          if (element.serviciosId === valor.serviciosId) {
            element.cargos = result.value.cargos;
            element.destino = result.value.destino;
            element.detalle = result.value.detalle;
            element.fechaFin = result.value.fechaFin;
            element.fechaInicio = result.value.fechaInicio;
            element.isActive = result.value.activo;
            element.moneda = result.value.moneda;
            element.precioBase = result.value.precioBase;
            element.tipo = result.value.tipo;
          }
      });
      this.boolService = true;
      } else {
        this.boolService = true;
      }
      
    });


  }


 

  anadirServicio(data) {
    let activo;
    if (data.value.activo === "") {
      activo = false;
    } else {
      activo = true;
    }
    let fechaIni = data.value.fechaInicio.toISOString();
    let fechaFi = data.value.fechaFin.toISOString();
    const pass = {
      cargos: parseFloat(data.value.cargos),
      destino: data.value.destino,
      detalle: data.value.detalle,
      fechaFin: fechaFi,
      fechaInicio: fechaIni,
      isActive: activo,
      moneda: data.value.moneda,
      precioBase: parseFloat(data.value.precioBase),
      tipo: data.value.tipo,
      serviciosId: data.value.serviciosId
    }
    this.dataServices.push(pass);
    this.boolService = true;
  }

  anadirPasajero(data) {
    let activo;
    let lvou = [];
    if (data.value.activo === "") {
      activo = false;
    } else {
      activo = true;
    }
    for (let index = 0; index < data.value.lvoucher.length; index++) {
      const element = data.value.lvoucher[index];
      const voucher = {
        archivo: element.archivo,
        isActive: element.isActive,
        tipo: element.tipo,
        titulo: element.titulo,
        vocuherId: index + 1,
      }
      lvou.push(voucher);
    }
    let fechaNac = data.value.fechaNac.toISOString();
    const pass = {
      cotizacionesPasajeroId: data.value.cotizacionesPasajeroId,
      nombres: data.value.nombre,
      apellidos: data.value.apellidos,
      tipoDocumento: data.value.tipoDoc,
      numeroDocumento: data.value.numeroDoc,
      correo: data.value.correo,
      telefono: data.value.telefono,
      tipoPax: data.value.tipoPas,
      fechaNacimiento: fechaNac,
      isActive: activo,
      lpasajerosVouchers: lvou
    }
    this.dataSource.push(pass);
    this.boolCoti = true;
  }

  initForm() {

    this.bookingForm = this.fb.group({
      fechaCre: new FormControl('', Validators.required),
    });
  }

  saveData() {
    if (this.bookingForm.value.fechaCre === "" || this.bookingForm.value.fechaCre === null) {
      return;
    } else {
      this.spinner.show();
    let insert = this.sessionService.getInsertUpdate();
    const data = new FormData();
    data.append('IsInsert', insert);
    data.append('NroCotizacion', this.dataCoti.nroCotizacion);
    data.append('CorrelativoCotizacion', this.dataCoti.correlativoCotizacion);
    data.append('Programa', this.dataCoti.programa);
    data.append('Tarjeta', this.dataCoti.tarjeta);
    data.append('FechaCotizacion', this.bookingForm.value.fechaCre.toISOString());
    data.append('CotizacionCreada', 'false');
    data.append('ResponsableCompra', this.dataCoti.responsableCompra);
    data.append('IsActive', this.dataCoti.isActive);
    for (let index = 0; index < this.dataSource.length; index++) {
      const element = this.dataSource[index];
      let CotizacionesPasajeroId = 'LcotizacionesPasajeros[' + index + '].CotizacionesPasajeroId';
      let Nombres = 'LcotizacionesPasajeros[' + index + '].Nombres';
      let Apellidos = 'LcotizacionesPasajeros[' + index + '].Apellidos';
      let TipoDocumento = 'LcotizacionesPasajeros[' + index + '].TipoDocumento';
      let NumeroDocumento = 'LcotizacionesPasajeros[' + index + '].NumeroDocumento';
      let Correo = 'LcotizacionesPasajeros[' + index + '].Correo';
      let Telefono = 'LcotizacionesPasajeros[' + index + '].Telefono';
      let TipoPax = 'LcotizacionesPasajeros[' + index + '].TipoPax';
      let FechaNacimiento = 'LcotizacionesPasajeros[' + index + '].FechaNacimiento';
      let IsActive = 'LcotizacionesPasajeros[' + index + '].IsActive';
      data.append(CotizacionesPasajeroId, element.cotizacionesPasajeroId);
      data.append(Nombres, element.nombres);
      data.append(Apellidos, element.apellidos);
      data.append(TipoDocumento, element.tipoDocumento);
      data.append(NumeroDocumento, element.numeroDocumento);
      data.append(Correo, element.correo);
      data.append(Telefono, element.telefono);
      data.append(TipoPax, element.tipoPax);
      data.append(FechaNacimiento, element.fechaNacimiento);
      data.append(IsActive, element.isActive);
      for (let j = 0; j < element.lpasajerosVouchers.length; j++) {
        const voucher = element.lpasajerosVouchers[j];
        let PasajerosVoucherId = 'LcotizacionesPasajeros[' + index + '].LpasajerosVouchers[' + j + '].PasajerosVoucherId';
        let Titulo = 'LcotizacionesPasajeros[' + index + '].LpasajerosVouchers[' + j + '].Titulo';
        let Tipo = 'LcotizacionesPasajeros[' + index + '].LpasajerosVouchers[' + j + '].Tipo';
        let Archivo = 'LcotizacionesPasajeros[' + index + '].LpasajerosVouchers[' + j + '].Archivo';
        let active = 'LcotizacionesPasajeros[' + index + '].LpasajerosVouchers[' + j + '].IsActive';
        data.append(PasajerosVoucherId, voucher.vocuherId);
        data.append(Titulo, voucher.titulo);
        data.append(Tipo, voucher.tipo);
        data.append(Archivo, voucher.archivo);
        data.append(active, voucher.isActive);
      }
    }

    for (let index = 0; index < this.dataServices.length; index++) {
      const element = this.dataServices[index];
      let CotizacionesProductoId = 'LcotizacionesProductos[' + index + '].CotizacionesProductoId';
      let Tipo = 'LcotizacionesProductos[' + index + '].Tipo';
      let Destino = 'LcotizacionesProductos[' + index + '].Destino';
      let FechaInicio = 'LcotizacionesProductos[' + index + '].FechaInicio';
      let FechaFin = 'LcotizacionesProductos[' + index + '].FechaFin';
      let PrecioBase = 'LcotizacionesProductos[' + index + '].PrecioBase';
      let Cargos = 'LcotizacionesProductos[' + index + '].Cargos';
      let Moneda = 'LcotizacionesProductos[' + index + '].Moneda';
      let Detalle = 'LcotizacionesProductos[' + index + '].Detalle';
      let IsActive = 'LcotizacionesProductos[' + index + '].IsActive';
      data.append(CotizacionesProductoId, element.serviciosId);
      data.append(Tipo, element.tipo);
      data.append(Destino, element.destino);
      data.append(FechaInicio, element.fechaInicio);
      data.append(FechaFin, element.fechaFin);
      data.append(PrecioBase, element.precioBase);
      data.append(Cargos, element.cargos);
      data.append(Moneda, element.moneda);
      data.append(Detalle, element.detalle);
      data.append(IsActive, element.isActive);
    }

    this.voucherService.InsertUpdateCotizaciones(data).subscribe(
      x => {
        console.log(x);
        if (x.status === 200) {
          this.spinner.hide();
          this.route.navigate(['voucher-list']);
        } else {
          this.spinner.hide();
          this.openSnackBar(x.message,'OK');
        }
        
      }
    )
    }
    
  }



  showDialogService() {
    this.boolService = false;
    const dialogRef = this.dialog.open(DialogAddServiceComponent, {
      data: null,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != undefined) {
        this.anadirServicio(result);
      } else {
        this.boolService = true;
      }
    });
  }



}
