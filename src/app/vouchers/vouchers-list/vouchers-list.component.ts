import { flatten } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from '../shared/session.service';
import { VoucherService } from '../shared/voucherService.model';

@Component({
  selector: 'app-vouchers-list',
  templateUrl: './vouchers-list.component.html',
  styleUrls: ['./vouchers-list.component.css'],
  providers: [VoucherService , NgxSpinnerService]
})

export class VouchersListComponent implements OnInit {
  
  

  labelPosition: any;
  migradoPosition: any;
  dataSource;
  dataWeb;
  searching = false;
  searching1 = false;
  boolCoti = false;
  boolWeb = false;
  dataCot;
  showWeb = false;
  showReceptivo = true;
  eventEditForm: FormGroup;
  selectedStatus:  number ;  
  list: [
    {"name": "Receptivo Offline", ID: "D1", "checked": true},
    {"name": "Ventas Web", ID: "D2", "checked": false}
  ]
 
  displayedColumns: string[] = [ 'nroCotizacion', 'programa', 'tarjeta', 'fechaCreacionShow', 'estado','isActive','edit'];
  displayedWeb: string[] = [ 'codeTransaction', 'servicio', 'tipoPago', 'nombreContacto', 'correoContacto'];
  /* @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; */
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  constructor(private router: Router,private service: VoucherService,private sessionService: SessionService,private spinner: NgxSpinnerService) { }

 
  

  ngOnInit() {
    this.labelPosition = 1;
    this.valor(this.labelPosition);
  }

  voucher(){
    this.router.navigate(['package/list'])
  }

  addCoti(){
    this.sessionService.setInsertUpdate(true);
    this.router.navigate(['voucher-new']);
  }

  getCotizacion(valor,setBool, user){

    this.sessionService.setInsertUpdate(setBool);
    
    this.spinner.show();
   
    console.log(valor);
    this.service.GetCotizacion(valor).subscribe(
      x => {
        if(x === null){
          this.sessionService.setUser(user);
          this.router.navigate(['voucher-new']);
          this.spinner.hide();
        } else {
          this.sessionService.setUser(null);
          this.sessionService.setCotizacionDetail(x);
          this.router.navigate(['voucher-detail']);
        }
        
      }
    )
  }

  valor(val){
    if (val === 1) {
      this.spinner.show();
      this.showWeb = false;
      this.showReceptivo = true;
      let web = document.getElementById('web')
      web.style.display = "none";
      let vou = document.getElementById('coti')
      vou.style.display = "block";
      this.traerVoucher();
      
    } else {
      this.spinner.show();
      this.showWeb = true;
      this.showReceptivo = false;
      let vou = document.getElementById('coti')
      vou.style.display = "none";
      let web = document.getElementById('web')
      web.style.display = "block";
      this.traerWeb();
    }
  }

  filtrar(valor){
    let listShow = [];
    if (valor === 1) {
      this.dataCot.forEach(element => {
        if(element.estado === 'Migrado'){
          listShow.push(element);
        }
      });
      this.dataSource = listShow;
    } else if (valor === 2){
      this.dataCot.forEach(element => {
        if(element.estado === 'No Migrado'){
          listShow.push(element);
        }
      });
      this.dataSource = listShow;
    } else if (valor === 3){
      this.dataCot.forEach(element => {
        if(element.estado === 'Creado'){
          listShow.push(element);
        }
      });
      this.dataSource = listShow;
    } else {
      this.dataSource = this.dataCot;
    }
    this.dataSource = new MatTableDataSource(this.dataSource);
        this.dataSource.paginator = this.paginator.toArray()[0];
        this.dataSource.sort = this.sort.toArray()[0];
  }

  traerVoucher(){
    this.service.ListCotizacion().subscribe(
      x => {
        this.dataCot = x;
        this.dataSource = new MatTableDataSource(x);
        this.dataSource.paginator = this.paginator.toArray()[0];
        this.dataSource.sort = this.sort.toArray()[0];
        this.spinner.hide();
      }
    )
  }

  applyFilterSource(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter(filterValue: string) {
    this.dataWeb.filter = filterValue.trim().toLowerCase();
    if (this.dataWeb.paginator) {
      this.dataWeb.paginator.firstPage();
    }
  }

  traerWeb(){
    this.service.ListWeb().subscribe(
      x => {
        this.dataWeb = new MatTableDataSource(x);
        this.dataWeb.paginator = this.paginator.toArray()[1];;
        this.dataWeb.sort = this.sort.toArray()[1];
        this.spinner.hide();
      }
    )
  }

}
