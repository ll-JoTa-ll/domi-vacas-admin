import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Select } from 'src/app/shared/select.model';
import { Price } from '../shared/price.model';
import * as util from '../../shared/util';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PackageService } from '../shared/package.service';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css'],
  providers: [ PackageService ]
})
export class PriceFormComponent implements OnInit {

  priceForm: FormGroup;
  saved: boolean;
  hotelMode: number;
  flightMode: number;
  hotels: Select[] = [];

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(
    public dialogRef: MatDialogRef<PriceFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Price,
    private formBuilder: FormBuilder,
    private packageService: PackageService
  ) { }

  ngOnInit() {
    this.initForm();
    this.getHotels();
  }

  getHotels() {
    this.packageService.getHotels('').subscribe(
      x => {
        if (x.confirmation) {
          this.hotels = x.data;
        }
      },
      err => { console.log('error: ' + err); },
      () => {
      }
    );
  }

  initForm() {
    this.priceForm = this.formBuilder.group({
      // beginDate: [{ value: '', disabled: true}, Validators.required],
      // endDate: [{ value: '', disabled: true}, Validators.required],
      beginDate: ['', Validators.required],
      endDate: ['', Validators.required],
      isHotelHtml: ['1', Validators.required],
      hotelHtml: [''],
      idhotel: [''],
      single: ['', Validators.required],
      double: ['', Validators.required],
      triple: ['', Validators.required],
      child: ['', Validators.required],
      // infant: ['', Validators.required],
      stock: ['', Validators.required],
      isFlightHtml: ['1', Validators.required],
      flightHtml: [''],
    });
  }

  isInvalid(control) {
    return this.saved || (control.touched && control.errors != null);
  }

  getErrorMessage(control) {
    return control.hasError('required') ? 'Campo requerido' :
    control.hasError('email') ? 'Correo no válido' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.saved = true;
    console.log(this.priceForm.value);

    if (this.priceForm.invalid) {
      return;
    }

    let price = new Price();
    price.beginDate = util.formatddmmyyyy(this.priceForm.controls.beginDate.value);
    price.endDate = util.formatddmmyyyy(this.priceForm.controls.endDate.value);
    price.isHotelHtml = this.priceForm.controls.isHotelHtml.value === '1';
    price.hotelHtml = this.priceForm.controls.hotelHtml.value;
    price.idHotel = this.priceForm.controls.idhotel.value;
    price.isFlightHtml = this.priceForm.controls.isFlightHtml.value === '1';
    price.flightHtml = this.priceForm.controls.flightHtml.value;
    price.single = parseFloat(this.priceForm.controls.single.value);
    price.double = parseFloat(this.priceForm.controls.double.value);
    price.triple = parseFloat(this.priceForm.controls.triple.value);
    price.child = parseFloat(this.priceForm.controls.child.value);
    // price.infant = parseFloat(this.priceForm.controls.infant.value);
    price.infant = 0;
    price.stock = parseInt(this.priceForm.controls.stock.value);
    this.dialogRef.close(price);
  }

}
