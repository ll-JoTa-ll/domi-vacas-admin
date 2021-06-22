import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { VoucherService } from 'src/app/vouchers/shared/voucherService.model';

@Component({
  selector: 'app-dialog-add-service',
  templateUrl: './dialog-add-service.component.html',
  styleUrls: ['./dialog-add-service.component.css'],
  providers: [VoucherService , NgxSpinnerService]
})
export class DialogAddServiceComponent implements OnInit {
  bookingForm: FormGroup;
  lCurrency;

  constructor(private fb: FormBuilder,private service: VoucherService,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initForm();
    this.getCurrency();
  }

  getCurrency(){
    this.spinner.show();
    this.service.getCurrency().subscribe(
      x => {
        this.lCurrency = x.lcurrencyLists;
        this.spinner.hide();
      }
    )
  }

  initForm() {

    this.bookingForm = this.fb.group({
      tipo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      destino: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*"),]),
      fechaInicio: new FormControl('', Validators.required),
      fechaFin: new FormControl('', Validators.required),
      precioBase: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      cargos: new FormControl('', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')]),
      moneda: new FormControl('', Validators.required),
      detalle: new FormControl('', Validators.required),
      activo: new FormControl(''),
      serviciosId: new FormControl(''),
    });
}

}
