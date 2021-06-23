import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogAddPassengerComponent } from '../dialog-add-passenger/dialog-add-passenger.component';

@Component({
  selector: 'app-dialog-add-voucher',
  templateUrl: './dialog-add-voucher.component.html',
  styleUrls: ['./dialog-add-voucher.component.css'],
  providers: [ NgxSpinnerService,DialogAddVoucherComponent]
})
export class DialogAddVoucherComponent implements OnInit {
  bookingForm: FormGroup;
  displayedVoucher: string[] = [ 'Titulo', 'tipo', 'file', 'isActive', 'edit'];
  dataSource = [];
  boolVoucher = false;
  archi;
  edit = false;
  documento;
  archivo;
  usuario;
  showButonEdit = false;
  showButonAdd = true;
  texto = 'Seleccione su Archivo';
  constructor(private dialogRef: MatDialogRef<DialogAddVoucherComponent>,private fb: FormBuilder,private spinner: NgxSpinnerService,@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.initForm();
    this.setTable(this.data);
  }

  setTable(valor){
    if (valor != null){
      valor.forEach(element => {
        const datos = {
          archivo: element.archivo,
          nombreOriginal : element.nombreOriginal,
          isActive: element.isActive,
          tipo: element.tipo,
          titulo: element.titulo,
          vocuherId: element.vocuherId,
        }
        this.dataSource.push(datos);
      });
    }
  }

  editVoucher(pass) {
    this.usuario = pass;
    this.documento = pass.nombreOriginal;
    this.archivo = pass.archivo;
    this.edit = true;
    this.bookingForm = this.fb.group({
      tipo: new FormControl(pass.tipo, [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      titulo: new FormControl(pass.titulo, [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      activo: new FormControl(pass.isActive),
    });
    this.showButonEdit = true;
    this.showButonAdd = false;
  }

  initForm() {

    this.bookingForm = this.fb.group({
      tipo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      titulo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      activo: new FormControl(''),
    });
  }

  actualizar(){
    this.dataSource.forEach(element => {
        if (element.vocuherId === this.usuario.vocuherId) {
          element.archivo = this.archivo;
          element.isActive = this.bookingForm.value.activo;
          element.nombreOriginal = this.documento;
          element.tipo = this.bookingForm.value.tipo;
          element.titulo = this.bookingForm.value.titulo;
        }
    });

    this.bookingForm = this.fb.group({
      tipo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      titulo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      activo: new FormControl(''),
    });
    this.documento = '';
    this.archivo = '';
    this.texto = 'Seleccione su Archivo';
    this.showButonEdit = false;
    this.showButonAdd = true;
  }

  voucherFIle(fileInputEvent: any){
    this.archi = fileInputEvent;
    this.texto = this.archi.target.files[0].name;
    this.documento = this.archi.target.files[0].name;
    this.archivo = this.archi.target.files[0];
    this.edit = false;
  }

  terminar(){
    this.bookingForm = this.fb.group({
      tipo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      titulo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      activo: new FormControl(''),
    });
    this.documento = '';
    this.archivo = '';
    this.boolVoucher = true;
    this.spinner.hide();
    this.texto = 'Seleccione su Archivo';
    this.showButonEdit = false;
  }

  document(){
    window.open(this.archivo , '_blank', 'toolbar=0,location=0,menubar=0');
  }

  addVoucher(){
    this.spinner.show();
    this.boolVoucher = false;
    let activo;
    if (this.bookingForm.value.activo === "") {
      activo = false;
    } else {
      activo = true;
    }
    const data = {
      archivo: this.archi.target.files[0],
      nombreOriginal : this.archi.target.files[0].name,
      isActive: activo,
      tipo: this.bookingForm.value.tipo,
      titulo: this.bookingForm.value.titulo,
      vocuherId: '',
    }
    this.dataSource.push(data);
    this.terminar();
  }



}
