import { Component, OnInit, ViewChild } from '@angular/core';
import { GetCompanyService } from '../shared/getCompany.service';
import { GetUsersByCompanyService } from '../shared/getUsersByCompany.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostInvitationPartnerClubService } from '../shared/postInvitationPartnerClub.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogSendComponent } from 'src/app/shared/components/dialog-send/dialog-send.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DialogAdvertenciaComponent } from 'src/app/shared/components/dialog-advertencia/dialog-advertencia.component';

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
  styleUrls: ['./partner-club-administrator.component.css'],
  providers: [NgxSpinnerService]
})
export class PartnerClubAdministratorComponent implements OnInit {

  filteredOptions: Observable<any[]>;
  form: FormGroup;
  listcompanys;


  validSendUser;
  listUsers;
  listausuarios;
  listaEnviar = [];
  invitacionEnviada: boolean;
  origins = [];
  originList = [];
  showDiv = false;
  showButton = false;
  spiner: boolean;
  textEmpresa: string;
  textRuc: string;
  listrue;
  listfalse;
  listaIds = [];
  dataSend: any;
  change;

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
    private obtenerConpanias: GetCompanyService,
    private obtenerUsuarios: GetUsersByCompanyService,
    private enviarInvitacion: PostInvitationPartnerClubService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
      ) { }

  ngOnInit() {
    this.getListCompany();

    this.form = this.formBuilder.group({
      country: []
    });

  }

  //Servicios >>>
  //Servicio sin parametro / Solo header
    getListCompany(){

        this.obtenerConpanias.ListCompany().subscribe(
        result => {
          /* console.log("Respuesta " + result); */
          this.listcompanys = result;

          this.filteredOptions = this.form.get('country').valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.bussinesName),
            map(bussinesName => bussinesName ? this._filter(bussinesName) : this.listcompanys.slice())
          );
        }
      )
    }

    private _filter(value: string): any[] {
      const filterValue = value.toLowerCase();
      return this.listcompanys.filter(option => option.bussinesName.toLowerCase().indexOf(filterValue) === 0);
    }





    //Servicio con parametros y Header
    getListUsers(param: string){
        this.showDiv = false;
        this.obtenerUsuarios.ListUsers(param).subscribe(
        result => {
/*           console.log("Respuesta " + result); */
          this.listUsers = result;
          this.listausuarios = result;
          this.listUsers = new MatTableDataSource(this.listUsers);
          this.listUsers.paginator = this.paginator;
          this.showDiv = true;
          this.spinner.hide();

        }
      )
    }

    showDialogRedirection(message: any) {
      const dialogRef = this.dialog.open(DialogSendComponent, {
        disableClose: true,
        data: message
      });

      dialogRef.afterClosed().subscribe(result => {
      });
    }

    showDialogAdver(message: any) {
      const dialogRef = this.dialog.open(DialogAdvertenciaComponent, {
        data: message
      });

      dialogRef.afterClosed().subscribe(result => {
        this.validSendUser = result;
      });
    }

    //Servicio sin parametro con Body (lista)
    putInvitacion(){
      this.spinner.show();
      console.log(this.selection.selected);
      for (const option of this.selection.selected) {
          if (option.invitationPartnerClub === true) {
              this.show = false;
              this.showDialogAdver(this.dataSend);
              break;
          } else {
            this.show = true;
          }
      }
      if (this.show) {
        console.log(this.validSendUser);
        this.enviarInvitacion.enviaInvitacion(this.dataSend).subscribe(
          result => {
            if (result === true) {
              this.spinner.hide();
              this.showDialogRedirection(result);
            } else {
              this.spinner.hide();
              this.showDialogRedirection(result);
            }
          },
          () => {
            this.spinner.hide();
          }
        )
      } else {
        this.spinner.hide();
      }
    }
    //fin Servicios <<<

    onCompanyChange(val: any,valor1,valor2) {
      this.spinner.show();
      this.textRuc = valor1;
      this.textEmpresa = valor2;
      this.getListUsers(val);
      }


    isAllSelected() {
      this.showButton = true;
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
        ref.checked = false;
        if(this.selection.selected.length === 0){
          this.showButton = false;
        }
      } else {
        this.isAllSelected() ?
          this.selection.clear() :
          this.listUsers.data.forEach(row => this.selection.select(row));
      }
      // console.log(ref);
    }

    isSomeSelected() {
      let listaid = [];
      this.listaIds = [];
      listaid = this.selection.selected;
      listaid.forEach(element => {
        this.listaIds.push(element.userId);
      });
      const data = {
        UserId: this.listaIds
      }
      this.dataSend = data;
      if (listaid.length > 0) {
        this.showButton = true;
      } else {
        this.showButton = false;
      }
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
