import { flatten } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
 
  displayedColumns: string[] = [ 'nroCotizacion', 'programa', 'tarjeta', 'fechaCreacionShow', 'estado','isActive','edit'];
  displayedWeb: string[] = [ 'codeTransaction', 'servicio', 'tipoPago', 'nombreContacto', 'correoContacto'];
  /* @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator; */
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  constructor(private router: Router,private service: VoucherService,private sessionService: SessionService,private spinner: NgxSpinnerService) { }

 
  

  ngOnInit() {
    
    
  }

  addCoti(){
    this.sessionService.setInsertUpdate(true);
    this.router.navigate(['voucher-new']);
  }

  getCotizacion(valor,setBool){

    this.sessionService.setInsertUpdate(setBool);
    this.spinner.show();
   
    console.log(valor);
    this.service.GetCotizacion(valor).subscribe(
      x => {
        if(x === null){

          this.spinner.hide();
        } else {
          this.sessionService.setCotizacionDetail(x);
          this.router.navigate(['voucher-detail']);
        }
        
      }
    )
  }

  valor(val){
    if (val === 1) {
      this.spinner.show();
      let web = document.getElementById('web')
      web.style.display = "none";
      let vou = document.getElementById('coti')
      vou.style.display = "block";
      this.traerVoucher();
      
    } else {
      this.spinner.show();
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
