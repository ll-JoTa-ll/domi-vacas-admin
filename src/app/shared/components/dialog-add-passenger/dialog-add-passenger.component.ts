import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { VoucherService } from 'src/app/vouchers/shared/voucherService.model';
import { DialogAddVoucherComponent } from '../dialog-add-voucher/dialog-add-voucher.component';

@Component({
  selector: 'app-dialog-add-passenger',
  templateUrl: './dialog-add-passenger.component.html',
  styleUrls: ['./dialog-add-passenger.component.css'],
  providers: [VoucherService, NgxSpinnerService, DialogAddVoucherComponent],
})
export class DialogAddPassengerComponent implements OnInit {

  bookingForm: FormGroup;
  lDocument;
  Error = false;
  lvouchers;
  ltypePassenger: any[] = [
    { value: 'ADT', viewValue: 'Adulto' },
    { value: 'INF', viewValue: 'Infante' },
    { value: 'CHD', viewValue: 'Niño' }
  ];
  constructor(private fb: FormBuilder, public dialog: MatDialog, private service: VoucherService, private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getDocument();
    this.initForm();
    console.log(this.data);
  }

  getDocument() {
    this.spinner.show();
    this.service.getDocument().subscribe(
      x => {
        this.lDocument = x.ldocumentTypeLists;
        this.spinner.hide();
      }
    )
  }

  initForm() {
    if (this.data === null) {
      this.bookingForm = this.fb.group({
        cotizacionesPasajeroId: new FormControl(''),
        nombre: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
        apellidos: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
        tipoDoc: new FormControl('', Validators.required),
        numeroDoc: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]*")]),
        correo: new FormControl('', [Validators.required, Validators.email]),
        telefono: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]*")]),
        tipoPas: new FormControl('', Validators.required),
        fechaNac: new FormControl('', Validators.required),
        lvoucher: new FormControl(''),
        activo: new FormControl(''),
      });
    } else {
      let date = new Date(this.data.fechaNacimiento);
      this.bookingForm = this.fb.group({
        cotizacionesPasajeroId: new FormControl(this.data.cotizacionesPasajeroId),
        nombre: new FormControl(this.data.nombres, [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
        apellidos: new FormControl(this.data.apellidos, [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
        tipoDoc: new FormControl(this.data.tipoDocumento, Validators.required),
        numeroDoc: new FormControl(this.data.numeroDocumento, [Validators.required, Validators.pattern("[0-9 ]*")]),
        correo: new FormControl(this.data.correo, [Validators.required, Validators.email]),
        telefono: new FormControl(this.data.telefono, [Validators.required, Validators.pattern("[0-9 ]*")]),
        tipoPas: new FormControl(this.data.tipoPax, Validators.required),
        fechaNac: new FormControl(date, Validators.required),
        lvoucher: new FormControl(this.data.lpasajerosVouchers),
        activo: new FormControl(this.data.isActive),
      });
    }

  }

  valid() {
    if (this.bookingForm.invalid) {
      this.Error = true;
      return;
    } else {
      this.Error = false;
      this.showDialogVoucher();
    }
  }

  showDialogVoucher() {
    const dialogRef = this.dialog.open(DialogAddVoucherComponent, {
      data: null,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lvouchers = result;
      this.bookingForm.value.lvoucher = this.lvouchers;
    });
  }


}
