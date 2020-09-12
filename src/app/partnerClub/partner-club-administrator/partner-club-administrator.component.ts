import { Component, OnInit, ViewChild } from '@angular/core';
import { getCompanyService } from '../shared/getCompany.service';
import { getUsersByCompanyService } from '../shared/getUsersByCompany.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { postInvitationPartnerClubService } from '../shared/postInvitationPartnerClub.service';
interface opcionesFiltro {
  value: string;
  viewValue: string;
}

export interface PeriodicElement {
  name: string;
  lastName: string;
  corporateEmail: string;
  numberDocument: string;
  vip: string;
  invitationPartnerClub: boolean;
  invitationDate: string;
  invitationDateShow: string;
}

@Component({
  selector: 'app-partner-club-administrator',
  templateUrl: './partner-club-administrator.component.html',
  styleUrls: ['./partner-club-administrator.component.css']
})
export class PartnerClubAdministratorComponent implements OnInit {
  listcompanys;
  listUsers;
  listausuarios;
  listaEnviar = [];
  invitacionEnviada: boolean;
  origins = [];
  originList = [];
  spiner: boolean;
  textEmpresa: string;
  textRuc: string;
  listrue;
  listfalse;
  lista = [{
    UserId: null
  }];

  //filtro
  filtros: opcionesFiltro[] = [
    {value: '1', viewValue: 'Todos'},
    {value: '2', viewValue: 'Usuarios Invitados'},
    {value: '3', viewValue: 'usuarios NO Invitados'}
  ];
  filtroSeleccionado = this.filtros[0].value;
  
  //paginacion
  show = false;
  displayedColumns: string[] = ['select', 'name', 'lastName', 'corporateEmail', 'numberDocument', 'vip', 'invitationPartnerClub', 'invitationDate' , 'invitationDateShow'];
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private obtenerConpanias: getCompanyService,
    private obtenerUsuarios: getUsersByCompanyService,
    private enviarInvitacion: postInvitationPartnerClubService
      ) { }

  ngOnInit() {
    this.getListCompany();
  }

  //Servicios >>>
  //Servicio sin parametro / Solo header
    getListCompany(){
        this.obtenerConpanias.ListCompany().subscribe(
        result => {
          /* console.log("Respuesta " + result); */          
          this.listcompanys = result;
        }
      )
    }

    //Servicio con parametros y Header
    getListUsers(param: string){
        this.obtenerUsuarios.ListUsers(param).subscribe(
        result => {
/*           console.log("Respuesta " + result); */
          this.listUsers = result;
          this.listausuarios = result;
          this.listUsers = new MatTableDataSource(this.listUsers);
          this.listUsers.paginator = this.paginator;
          this.spiner = false;
        }        
      )
    }

    //Servicio sin parametro con Body (lista)
    putInvitacion(){
      this.enviarInvitacion.enviaInvitacion(this.listaEnviar).subscribe(
        result =>{
          console.log(result);
          this.invitacionEnviada = result;
        }
      )
    }
    //fin Servicios <<<

    onCompanyChange(val: any) {    
      this.spiner = true; 
        this.getListUsers(val.value);
    }


    isAllSelected() {
   
      const numSelected = this.selection.selected.length;
      const numRows = this.listUsers.data.length;
      // console.log(numSelected,numRows);
      
      return numSelected === numRows;
      
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(ref) {
      // console.log(ref);
      // if there is a selection then clear that selection
      if (this.isSomeSelected()) {
        
        this.selection.clear();
      ref.checked=false;
        
      } else {
        this.isAllSelected() ?
          this.selection.clear() :
          this.listUsers.data.forEach(row => this.selection.select(row));
      }
      // console.log(ref);
    }
  
    isSomeSelected() {
      let listaid = [];
      let lista2 = [];
      listaid = this.selection.selected;
      //
      //return this.selection.selected.length > 0;
      //
      listaid.forEach(element => {
/*          const data = {
           [UserId: element.userId];         
        }
         lista2.push(data);    */ 
         listaid = [element.userId];      
      });
      console.log(JSON.stringify(lista2));
      this.listaEnviar = listaid;
      return this.selection.selected.length > 0;
    }

    showEmpresa(valor, valor2){
      console.log(valor);
      this.textEmpresa = valor;
      this.textRuc = valor2;
    }

    //filtros
    onFiltroChange(valor){
      let variable;
      this.listrue = [];
      this.listfalse = [];

      this.listausuarios.forEach(element => {
        if(element.invitationPartnerClub === true){
          this.listrue.push(element);
        }
        if(element.invitationPartnerClub === false){
          this.listfalse.push(element);
        }
      });
      this.listrue = new MatTableDataSource(this.listrue);
      this.listfalse = new MatTableDataSource(this.listfalse);
      this.listrue.paginator = this.paginator;
      this.listfalse.paginator = this.paginator;

    switch (valor) {
      case "2":
        //invitados
        this.listUsers = this.listrue;
        break;
      case "3":
        //NO invitados
        this.listUsers = this.listfalse;
      break;
      default:
        this.listUsers = this.listausuarios;        
        this.listUsers = new MatTableDataSource(this.listUsers);
        this.listUsers.paginator = this.paginator;
        break;
    }
    }

    pplyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.listUsers.filter = filterValue;
    }
    
}
