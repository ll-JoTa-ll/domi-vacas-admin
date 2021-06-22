import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dialog-add-voucher',
  templateUrl: './dialog-add-voucher.component.html',
  styleUrls: ['./dialog-add-voucher.component.css'],
  providers: [ NgxSpinnerService]
})
export class DialogAddVoucherComponent implements OnInit {
  bookingForm: FormGroup;
  displayedVoucher: string[] = [ 'Titulo', 'tipo', 'file', 'isActive', 'edit'];
  dataSource = [];
  boolVoucher = false;
  archi;
  constructor(private fb: FormBuilder,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    this.bookingForm = this.fb.group({
      tipo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      titulo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      activo: new FormControl(''),
    });
  }

  voucherFIle(fileInputEvent: any){
    this.archi = fileInputEvent;
  }

  terminar(){
    this.boolVoucher = true;
    this.spinner.hide();
  }

  addVoucher(){
    this.spinner.show();
    this.boolVoucher = false;
    let activo;
    if (this.bookingForm.value.activo === "") {
      activo = false;
    }
    const data = {
      archivo: this.archi.target.files[0],
      name : this.archi.target.files[0].name,
      isActive: activo,
      tipo: this.bookingForm.value.tipo,
      titulo: this.bookingForm.value.titulo,
      vocuherId: null,
    }
    this.dataSource.push(data);
    this.terminar();
  }



}
