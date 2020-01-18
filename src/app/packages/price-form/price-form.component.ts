import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Select } from 'src/app/shared/select.model';
import { Price } from '../shared/price.model';
import * as util from '../../shared/util';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PackageService } from '../shared/package.service';
import { FlightItinerary } from '../shared/flight-itinerary.model';
import { Airline } from '../shared/airline.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css'],
  providers: [ PackageService ]
})
export class PriceFormComponent implements OnInit {

  update: boolean;
  title = 'Crear Precio';

  priceForm: FormGroup;
  saved: boolean;
  hotelMode: number;
  flightMode: number;
  hotels: Select[] = [];
  airlines: Select[] = [];

  utils: any;
  flightItineraryForm: FormGroup;
  flightItineraries: FlightItinerary[] = [];
  idFlightItinerary = '';
  dataSource = [];
  displayedColumns: string[] = [
    'origin', 'destiny', 'departure',
    'arrive', 'airline', 'edit', 'delete'
  ];

  submitted: boolean;

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
    private packageService: PackageService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.utils = util;
    this.initForm();
    this.getHotels();
    this.getAirlines();
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

  getAirlines() {
    this.packageService.getAirlines().subscribe(
      x => {
        if (x.confirmation) {
          this.airlines = x.data;
        }
      },
      err => { console.log('error: ' + err); },
      () => {
      }
    );
  }

  initForm() {

    let beginDate = '';
    let endDate = '';
    let isHotelHtml = '1';
    let hotelHtml = '';
    let idhotel = '';
    let single = '';
    let double = '';
    let triple = '';
    let child = '';
    let infant = '';
    let stockChild = '';
    let stockInfant = '';
    let stock = '';
    let isFlightHtml = '1';
    let flightHtml = '';

    if (this.data.id !== undefined) {
      this.update = true;
      this.title = 'Editar Precio';
      // beginDate = util.ddmmyyyytoDate(this.data.beginDate).toISOString();
      beginDate = this.data.beginDate;
      // endDate = util.ddmmyyyytoDate(this.data.endDate).toISOString();
      endDate = this.data.endDate;
      isHotelHtml = this.data.isHotelHtml ? '1' : '2';
      single = this.data.single.toString();
      double = this.data.double.toString();
      triple = this.data.triple.toString();
      child = this.data.child.toString();
      infant = this.data.infant.toString();
      if (this.data.stockChild) {
        stockChild = this.data.stockChild.toString();
      }
      if (this.data.stockInfant) {
        stockInfant = this.data.stockInfant.toString();
      }
      stock = this.data.stock.toString();
      isFlightHtml = this.data.isFlightHtml ? '1' : '2';

      if (this.data.isHotelHtml) {
        hotelHtml = this.data.hotelHtml;
      } else {
        idhotel = this.data.idHotel.toString();
      }

      if (this.data.isFlightHtml) {
        flightHtml = this.data.flightHtml;
      } else {
        this.flightItineraries = this.data.flightItinerary;
        this.refreshFlightItinerary();
      }
    }


    this.priceForm = this.formBuilder.group({
      // beginDate: [{ value: '', disabled: true}, Validators.required],
      // endDate: [{ value: '', disabled: true}, Validators.required],
      beginDate: [beginDate, Validators.required],
      endDate: [endDate, Validators.required],
      isHotelHtml: [isHotelHtml, Validators.required],
      hotelHtml: [hotelHtml],
      idhotel: [idhotel],
      single: [single, [Validators.required, Validators.min(0)]],
      double: [double, [Validators.required, Validators.min(0)]],
      triple: [triple, [Validators.required, Validators.min(0)]],
      child: [child, [Validators.required, Validators.min(-2)]],
      infant: [infant, [Validators.required, Validators.min(-2)]],
      stockChild: [stockChild, [Validators.min(0)]],
      stockInfant: [stockInfant, [Validators.min(0)]],
      stock: [stock, [Validators.required, Validators.min(0)]],
      isFlightHtml: [isFlightHtml, Validators.required],
      flightHtml: [flightHtml],
    });

    this.flightItineraryForm = this.formBuilder.group({
      origin: ['', Validators.required],
      destiny: ['', Validators.required],
      departure: ['', Validators.required],
      arrive: ['', Validators.required],
      beginHours: ['', Validators.required],
      endHours: ['', Validators.required],
      airlineId: ['', Validators.required]
    });
  }

  isInvalid(control, touched) {
    return touched ? this.submitted || (control.touched && control.errors != null) : this.submitted && control.errors != null;
  }

  getErrorMessage(control) {
    return control.hasError('required') ? 'Campo requerido' :
            control.hasError('email') ? 'Not a valid email' :
            control.hasError('min') ? 'Valor incorrecto' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * FlightItinerary
   */

  addFlightItinerary() {

    this.submitted = true;

    if (this.flightItineraryForm.invalid) {
      return;
    }

    const flight = new FlightItinerary();
    flight.id = (this.flightItineraries.length + 1).toString();
    flight.new = true;
    flight.isActive = true;
    flight.origin = this.flightItineraryForm.controls.origin.value;
    flight.destiny = this.flightItineraryForm.controls.destiny.value;
    flight.departure = this.flightItineraryForm.controls.departure.value;
    flight.arrive = this.flightItineraryForm.controls.arrive.value;
    flight.beginHours =  this.flightItineraryForm.controls.beginHours.value;
    flight.endHours = this.flightItineraryForm.controls.endHours.value;
    flight.airlineId = this.flightItineraryForm.controls.airlineId.value;
    flight.airline = this.airlines.find(x => x.id === flight.airlineId).description;
    this.flightItineraries.push(flight);
    this.refreshFlightItinerary();
    this.flightItineraryForm.reset();
  }

  editFlightItinerary(flight: FlightItinerary) {
    this.idFlightItinerary = flight.id;
    this.flightItineraryForm.controls.origin.setValue(flight.origin);
    this.flightItineraryForm.controls.destiny.setValue(flight.destiny);
    this.flightItineraryForm.controls.departure.setValue(flight.departure);
    this.flightItineraryForm.controls.arrive.setValue(flight.arrive);
    this.flightItineraryForm.controls.beginHours.setValue(flight.beginHours);
    this.flightItineraryForm.controls.endHours.setValue(flight.endHours);
    this.flightItineraryForm.controls.airlineId.setValue(flight.airlineId);
  }

  onUpdateFlightItinerary() {
    this.flightItineraries.forEach(element => {
      if (element.id === this.idFlightItinerary) {
        element.origin = this.flightItineraryForm.controls.origin.value;
        element.destiny = this.flightItineraryForm.controls.destiny.value;
        element.departure = this.flightItineraryForm.controls.departure.value;
        element.arrive = this.flightItineraryForm.controls.arrive.value;
        element.beginHours = this.flightItineraryForm.controls.beginHours.value;
        element.endHours = this.flightItineraryForm.controls.endHours.value;
        element.airlineId = this.flightItineraryForm.controls.airlineId.value;
        element.airline = this.airlines.find(x => x.id === element.airlineId).description;
      }
    });
    this.resetFlightItinerary();
  }

  removeFlightItinerary(flight: FlightItinerary) {
    if (flight.new) {
      this.flightItineraries = this.flightItineraries.filter(x => x.id !== flight.id);
    } else {
      flight.isActive = false;
    }
    this.refreshFlightItinerary();
  }


  refreshFlightItinerary() {
    this.dataSource = [...this.flightItineraries.filter(x => x.isActive === true)];
  }

  resetFlightItinerary() {
    this.idFlightItinerary = '';
    this.flightItineraryForm.reset();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  /**
   * Save
   */
  save() {
    this.saved = true;
    console.log(this.priceForm.value);

    if (this.priceForm.invalid) {
      return;
    }

    const child = this.priceForm.controls.child.value;
    if (child !== '' && parseInt(child) >= 0 && this.priceForm.controls.stockChild.value === '') {
      this.openSnackBar('Ingrese stock para child');
      return;
    }

    const infant = this.priceForm.controls.infant.value;
    if (infant !== '' && parseInt(infant) >= 0 && this.priceForm.controls.stockInfant.value === '') {
      this.openSnackBar('Ingrese stock para infant');
      return;
    }

    if (this.priceForm.controls.isHotelHtml.value === '1' && this.priceForm.controls.hotelHtml.value === '') {
      this.openSnackBar('Ingrese html para hotel');
      return;
    }

    if (this.priceForm.controls.isFlightHtml.value === '1' && this.priceForm.controls.flightHtml.value === '') {
      this.openSnackBar('Ingrese html para vuelo');
      return;
    }

    if (this.priceForm.controls.isFlightHtml.value === '2' && this.flightItineraries.length <= 0) {
      this.openSnackBar('Ingrese al menos un itinerario de vuelo');
      return;
    }

    if (this.priceForm.controls.isHotelHtml.value === '2' && this.priceForm.controls.idhotel.value === '') {
      this.openSnackBar('Seleccione un hotel');
      return;
    }

    const price = new Price();

    if (this.update) {
      price.id = this.data.id;
    } else {
      price.id = '';
    }

    price.beginDate = this.priceForm.controls.beginDate.value;
    price.endDate = this.priceForm.controls.endDate.value;
    price.isHotelHtml = this.priceForm.controls.isHotelHtml.value === '1';
    if (price.isHotelHtml) {
      price.hotelHtml = this.priceForm.controls.hotelHtml.value;
      price.idHotel = '';
    } else {
      price.hotelHtml = '';
      price.idHotel = this.priceForm.controls.idhotel.value;
    }

    price.isFlightHtml = this.priceForm.controls.isFlightHtml.value === '1';
    if (price.isFlightHtml) {
      price.flightHtml = this.priceForm.controls.flightHtml.value;
      price.flightItinerary = [];
    } else {
      price.flightHtml = '';
      price.flightItinerary = this.flightItineraries;
    }

    price.single = parseFloat(this.priceForm.controls.single.value);
    price.double = parseFloat(this.priceForm.controls.double.value);
    price.triple = parseFloat(this.priceForm.controls.triple.value);
    price.child = parseFloat(this.priceForm.controls.child.value);
    price.infant = parseFloat(this.priceForm.controls.infant.value);
    price.stock = parseInt(this.priceForm.controls.stock.value);
    if (this.priceForm.controls.stockChild.value === '') {
      price.stockChild = 0;
    } else {
      price.stockChild = parseInt(this.priceForm.controls.stockChild.value);
    }

    if (this.priceForm.controls.stockInfant.value === '') {
      price.stockInfant = 0;
    } else {
      price.stockInfant = parseInt(this.priceForm.controls.stockInfant.value);
    }

    price.idDeparture = this.data.idDeparture;


    console.log(price);

    this.dialogRef.close(price);
  }

}
