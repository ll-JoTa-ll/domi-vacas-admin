import { Component, OnInit, ChangeDetectorRef, NgZone, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidationErrors } from '@angular/forms';
import { Select } from 'src/app/shared/select.model';
import * as config from '../../shared/config';
import * as util from '../../shared/util';
import { CategoryService } from 'src/app/categories/shared/category.service';
import { PackageService } from '../shared/package.service';
import { MatDialog } from '@angular/material/dialog';
import { Price } from '../shared/price.model';
import { PriceFormComponent } from '../price-form/price-form.component';
import { Departure } from '../shared/departure.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Package } from '../shared/package.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';
import { Include } from '../shared/include.model';
import { IncludeFormComponent } from '../include-form/include-form.component';
import { Itinerary } from '../shared/itinerary.model';
import { ItineraryDetailFormComponent } from '../itinerary-detail-form/itinerary-detail-form.component';
import { DomSanitizer } from '@angular/platform-browser';
import { FlightItinerary } from '../shared/flight-itinerary.model';
import { DialogNotificationComponent } from 'src/app/notifications/dialog-notification/dialog-notification.component';
import { ItineraryDetail } from '../shared/itinerary-detail.model';

export class Amenities {
  id: string;
  description: string;
  checked: boolean;
}

@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.css'],
  // encapsulation: ViewEncapsulation.None,
  providers: [ CategoryService, PackageService ]
})
export class PackageFormComponent implements OnInit {

  utils: any;
  packageForm: FormGroup;
  submitted: boolean;
  categories: Select[] = [];
  amenitiesSelect: Select[] = [];
  amenities: Amenities[] = [];
  uploadedFiles: any[] = [];
  loading: boolean;
  dataSource = [];
  includeDataSource = [];
  itineraryDataSource = [];
  prices = [];
  departures: Departure[] = [];
  fileImage: any;
  fileImageShowCase: any;
  displayedColumns: string[] = [
    'beginDate', 'endDate'
    // , 'hotel'
    , 'simple', 'double', 'triple'
    , 'child', 'stockChild', 'infant'
    , 'stockInfant', 'stock'
    // , 'flight'
    , 'edit'
  ];

  displayedIncludeColumns: string[] = [
    'title', 'description', 'icon'
    , 'edit', 'delete'
  ];

  displayedItineraryColumns: string[] = [
    'title', 'detail', 'edit', 'delete'
  ];

  includes: Include[] = [];
  itineraries: Itinerary[] = [];
  idItinerary = '';

  htmlContent = '';
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

  update: boolean;
  packageId = '';
  package: Package;
  title = 'Crear Paquete';
  changeImage: boolean;
  changeImageShowCase: boolean;

  // date: Date;
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private packageService: PackageService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private  ngZone: NgZone,
    private router: Router,
    protected sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    // this.date = new Date(2020, 11, 1);
    this.userId = sessionStorage.getItem('userId');
    if (!this.userId || this.userId === '') {
      this.router.navigate(['']);
    } else {
      this.loadInfo();
      this.utils = util;
    }
  }

  /**
   * loadInfo
   */
  loadInfo() {
    this.getCategories();
  }

  getCategories() {
    this.loading = true;
    this.categoryService.selectList().subscribe(
      x => {
        if (x.confirmation) {
          this.categories = x.data;
        }
      },
      err => { 
        console.log('error: ' + err);
        this.loading = false;
      },
      () => {
        this.getAmenities();
      }
    );
  }

  getAmenities() {
    this.packageService.listAmenities().subscribe(
      x => {
        if (x.confirmation) {
          this.amenitiesSelect = x.data;
          this.amenitiesSelect.forEach(element => {
            this.amenities.push({
              id: element.id,
              description: element.description,
              checked: false
            });
          });
        }
      },
      err => { 
        console.log('error: ' + err);
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.initConfig();
      }
    );
  }

  /**
   * InitForm
   */
  initConfig() {
    this.packageId = sessionStorage.getItem('packageId');
    console.log('on init - packageid: ', this.packageId);
    if (this.packageId !== '') {
      this.update = true;
      this.title = 'Editar Paquete';
      this.getPackage();
      //recuperar datos del servicio
      //actualizar los datos para editarlos
      //setear los datos segun sea el caso
    } else {
      this.initForm();
    }
  }

  getPackage() {
    this.loading = true;
    this.packageService.get(this.packageId).subscribe(
      x => {
        if (x.confirmation) {
          this.package = x.data;
        }
      },
      err => { 
        console.log('error: ' + err);
        this.initForm();
        this.loading = false;
      },
      () => {
        this.initForm();
        this.loadInfoPackage();
        this.loading = false;
      }
    );
  }

  loadInfoPackage() {
    this.packageForm.controls.name.setValue(this.package.name);
    this.packageForm.controls.description.setValue(this.package.description);
    this.packageForm.controls.days.setValue(this.package.days);
    this.packageForm.controls.nights.setValue(this.package.nights);
    this.packageForm.controls.discount.setValue(this.package.discount);
    this.packageForm.controls.inShowCase.setValue(this.package.isVisible);
    this.packageForm.controls.category.setValue(this.package.idCategory);
    this.packageForm.controls.keyword.setValue(this.package.destiny);
    this.packageForm.controls.notes.setValue(this.package.notes);
    if (this.package.expirationDate && this.package.expirationDate !== '') {
      this.packageForm.controls.expirationDate.setValue(util.ddmmyyyytoDate(this.package.expirationDate));
    }
    this.packageForm.controls.isIncludeHtml.setValue(this.package.isIncludeHtml ? '1' : '2');
    this.packageForm.controls.includeHtml.setValue(this.package.includeHtml);
    this.packageForm.controls.isItineraryHtml.setValue(this.package.isItineraryHtml ? '1' : '2');
    this.packageForm.controls.itineraryHtml.setValue(this.package.itineraryHtml);
    this.packageForm.controls.conditions.setValue(this.package.conditions);
    this.packageForm.controls.regulations.setValue(this.package.regulations);

    //amenities
    const formArray: FormArray = this.packageForm.get('amenities') as FormArray;
    this.package.amenities.forEach(element => {
      formArray.push(new FormControl(element));
    });
    this.amenities.forEach(element => {
      if (this.package.amenities.includes(element.id)) {
        element.checked = true;
      }
    });

    //includes
    this.includes = this.package.includes;
    this.includes.forEach(element => {
      element.new = false;
      // element.isActive = true;
    });
    this.refreshIncludes();

    //itinerarios
    this.itineraries = this.package.itinerary;
    this.itineraries.forEach(itinerary => {
      itinerary.new = false;
      itinerary.isActive = true;
      itinerary.litinerayPackageDetail.forEach(detail => {
        detail.new = false;
        // detail.isActive = true;
      });
    });
    this.refreshItinerary();

    //precios
    this.departures = this.package.departures;
    this.departures.forEach(departure => {
      departure.new = false;
      // departure.isActive = true;
      departure.beginDate = util.ddmmyyyytoDate(departure.beginDate).toISOString();
      departure.endDate = util.ddmmyyyytoDate(departure.endDate).toISOString();
      departure.prices.forEach(price => {
        price.idDeparture = departure.id;
        price.beginDate = departure.beginDate;
        price.endDate = departure.endDate;
        price.new = false;
        // price.isActive = true;
        price.flightItinerary.forEach(flight => {
          flight.departure = util.ddmmyyyytoDate(flight.departure).toISOString();
          flight.arrive = util.ddmmyyyytoDate(flight.arrive).toISOString();
          flight.new = false;
          // flight.isActive = true;
        });
        this.prices.push(price);
      });
    });
    console.log('price1');
    this.dataSource = [...this.prices];
  }

  refreshIncludes() {
    console.log(this.includes);
    // this.includeDataSource = [...this.includes];
    this.includeDataSource = [...this.includes.filter(x => x.isActive === true)];
  }

  initForm() {
    // console.log(this.date.toISOString());
    this.packageForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      days: ['', [Validators.required, Validators.min(1)]],
      nights: ['', [Validators.required, Validators.min(1)]],
      discount: [''],
      inShowCase: [''],
      category: ['', Validators.required],
      keyword: ['', Validators.required],
      notes: [''],
      expirationDate: ['', Validators.required],
      amenities: new FormArray([]),
      isIncludeHtml: ['1'],
      includeHtml: [''],
      isItineraryHtml: ['1'],
      itineraryHtml: [''],
      conditions: ['', Validators.required],
      regulations: ['', Validators.required],
      urlImage: [''],
      urlImageShowCase: [''],
      fileImage: [''],
      fileImageShowCase: [''],
      itineraryTitle: [''],
    });
  }

  /**
   * Datos generales
   */

  onFileChange(event, field: string) {
    if (event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      if (field === 'fileImage') {
        this.changeImage = true;
      } else if (field === 'fileImageShowCase') {
        this.changeImageShowCase = true;
      }
      this.packageForm.get(field).setValue(file);
    }
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

  isInvalid(control) {
    return this.submitted || (control.touched && control.errors != null);
  }

  getErrorMessage(control) {
    return control.hasError('required') ? 'Campo requerido' :
            control.hasError('email') ? 'Not a valid email' :
            control.hasError('min') ? 'Valor incorrecto' : '';
  }

  /**
   * Prices
   */

  addPrice() {
    this.openDialog(new Price());
  }

  editPrice(price: Price) {
    this.openDialog(price);
  }

  openDialog(price: Price): void {
    const dialogRef = this.dialog.open(PriceFormComponent, {
      width: '80vh',
      maxHeight: '90vh',
      data: price
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result) {
        this.loadPrice(result);
      }
    });
  }

  addPriceInDeparture(price: Price) {
    const index = this.departures.findIndex(x => (util.formatddmmyyyy(x.beginDate) === util.formatddmmyyyy(price.beginDate)
        && util.formatddmmyyyy(x.endDate) === util.formatddmmyyyy(price.endDate)));
    if (index >= 0) {
      price.idDeparture = this.departures[index].id;
      this.departures[index].prices.push(price);
    } else {
      const departure = new Departure();
      departure.id = this.generateDepartureId();
      departure.new = true;
      departure.isActive = true;
      departure.beginDate = price.beginDate;
      departure.endDate = price.endDate;
      price.idDeparture = departure.id;
      departure.prices = [price];
      this.departures.push(departure);
    }
    return price;
  }

  generateDepartureId() {
    return 'd' + (this.departures.length + 1);
  }

  generatePriceId() {
    return 'p' + (this.prices.length + 1);
  }

  changeDeparture(price, departureIndex) {
    return this.departures[departureIndex].beginDate !== price.beginDate || this.departures[departureIndex].endDate !== price.endDate;
  }

  loadPrice(price: Price) {

    if (price) {
      if (price.id === '') { //new
        price.id =  this.generatePriceId();
        price.new = true;
        price.isActive = true;
        price = this.addPriceInDeparture(price);
        this.prices.push(price);
      } else {
        const departureIndex = this.departures.findIndex(x => (x.id === price.idDeparture));
        console.log('departureIndex', departureIndex);
        if (departureIndex >= 0) {
          const priceIndex = this.departures[departureIndex].prices.findIndex(x => x.id === price.id);
          console.log('priceIndex', priceIndex);
          if (this.changeDeparture(price, departureIndex)) {
            this.departures[departureIndex].prices.splice(priceIndex, 1);
            price = this.addPriceInDeparture(price);
          } else {
            this.departures[departureIndex].prices[priceIndex] = price;
          }
          const index = this.prices.findIndex(x => x.id === price.id);
          this.prices[index] = price;
        }
      }
      console.log('price2');
      this.dataSource = [...this.prices];
    }

    console.log('resultado final: ', this.departures);
  }

  refreshTable() {
    console.log('price3');
    this.dataSource = [...this.prices];
  }

  /**
   * Incluye
   */

  onCheckChange(event) {
    const formArray: FormArray = this.packageForm.get('amenities') as FormArray;
    if (event.target.checked) {
      if (formArray.length < config.LIMIT_OF_AMENITIES) {
        formArray.push(new FormControl(event.target.value));
      } else {
        this.openSnackBar('Límite de amenities: ' + config.LIMIT_OF_AMENITIES);
        event.target.checked = false;
      }
    } else {
      let i = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  addInclude() {
    this.openIncludeDialog(new Include());
  }

  editInclude(id: string) {
    const include = this.includes.find(x => x.id === id);
    this.openIncludeDialog(include);
  }

  removeInclude(include: Include) {
    /**
     * show dialog
     */
    if (include.new) {
      this.includes = this.includes.filter(x => x.id !== include.id);
    } else {
      include.isActive = false;
    }
    this.refreshIncludes();
  }

  openIncludeDialog(include: Include): void {
    console.log('opendialog', include);
    const dialogRef = this.dialog.open(IncludeFormComponent, {
      width: '500px',
      data: include
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.loadInclude(result);
    });
  }

  loadInclude(include: Include) {
    if (include) {
      if (include.id !== '') {
        this.includes.forEach(element => {
          if (element.id === include.id) {
            element.title = include.title;
            element.description = include.description;
            element.idIcon = include.idIcon;
            element.icon = include.icon;
          }
        });
      } else {
        include.id = (this.includes.length + 1).toString();
        include.new = true;
        include.isActive = true;
        this.includes.push(include);
      }
      this.refreshIncludes();
    }
  }

  getUrlIcon(icon: string) {
    return util.getUrlIcon(icon);
  }

  /**
   * Itinerario
   */

  addItinerary() {

    if (this.packageForm.controls.itineraryTitle.value === '') {
      this.openSnackBar('Ingrese Titulo de itinerario');
      return;
    }

    const itinerary = new Itinerary();
    itinerary.id = (this.itineraries.length + 1).toString();
    itinerary.new = true;
    itinerary.isActive = true;
    itinerary.title = this.packageForm.controls.itineraryTitle.value;
    itinerary.litinerayPackageDetail = [];
    itinerary.details = 0;
    this.itineraries.push(itinerary);
    this.refreshItinerary();
    this.packageForm.controls.itineraryTitle.setValue('');
  }

  refreshItinerary() {
    console.log(this.itineraries);
    this.itineraryDataSource = [...this.itineraries.filter(x => x.isActive === true)];
  }

  addItineraryDetail(itinerary: Itinerary) {
    console.log('addItineraryDetail', itinerary);
    const dialogRef = this.dialog.open(ItineraryDetailFormComponent, {
      width: '80vh',
      maxHeight: '90vh',
      data: itinerary
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.loadItineraryDetail(result);
    });
  }

  loadItineraryDetail(itinerary: Itinerary) {
    console.log('return', itinerary);
    if (itinerary) {
      this.itineraries.forEach(element => {
        if (element.id === itinerary.id) {
          element.details = itinerary.details;
          element.litinerayPackageDetail = itinerary.litinerayPackageDetail;
        }
      });
      console.log('updateitineraries', this.itineraries);
      this.refreshItinerary();
    }
  }

  editItinerary(itinerary: Itinerary) {
    this.idItinerary = itinerary.id;
    this.packageForm.controls.itineraryTitle.setValue(itinerary.title);
  }

  onUpdateItinerary() {
    this.itineraries.forEach(element => {
      if (element.id === this.idItinerary) {
        element.title = this.packageForm.controls.itineraryTitle.value;
      }
    });
    this.resetItinerary();
  }

  resetItinerary() {
    this.idItinerary = '';
    this.packageForm.controls.itineraryTitle.setValue('');
  }

  removeItinerary(itinerary: Itinerary) {
    if (itinerary.new) {
      this.itineraries = this.itineraries.filter(x => x.id !== itinerary.id);
    } else {
      itinerary.isActive = false;
    }
    this.refreshItinerary();
  }

  /**
   * Save
   */

  save() {

    this.submitted = true;

    if (this.packageForm.invalid) {
      this.openSnackBar('Complete campos requeridos');
      console.log(this.showErrors());
      return;
    }

    if (this.departures.length <= 0) {
      this.openSnackBar('Debe ingresar al menos un precio');
      return;
    }

    if (this.packageForm.controls.isIncludeHtml.value === '2' && this.includes.length <= 0) {
      this.openSnackBar('Debe ingresar al menos un incluye');
      return;
    }

    // if (this.packageForm.controls.isIncludeHtml.value === '1' && this.packageForm.controls.includeHtml.value === '') {
    //   this.openSnackBar('Debe ingresar texto en include');
    //   return;
    // }

    // if (this.packageForm.controls.isItineraryHtml.value === '1' && this.packageForm.controls.itineraryHtml.value === '') {
    //   this.openSnackBar('Debe ingresar texto html en itinerario');
    //   return;
    // }

    if (this.packageForm.controls.isItineraryHtml.value === '2' && this.itineraries.length <= 0) {
      this.openSnackBar('Debe ingresar al menos un itinerario');
      return;
    }

    if (!this.update && this.packageForm.controls.fileImageShowCase.value === '') {
      this.openSnackBar('Debe seleccionar una imagen principal');
      return;
    }

    if (!this.update && this.packageForm.controls.fileImageShowCase.value === '') {
      this.openSnackBar('Debe seleccionar una imagen de vitrina');
      return;
    }

    const pack = new Package();

    if (this.update) {
      pack.id = this.package.id;
    } else {
      pack.id = '';
    }

    pack.name = this.packageForm.controls.name.value;
    pack.description = this.packageForm.controls.description.value;
    pack.discount = 0;
    pack.isActive = false;
    pack.isVisible = this.packageForm.controls.inShowCase.value === '' ? false : this.packageForm.controls.inShowCase.value;
    pack.days = this.packageForm.controls.days.value;
    pack.nights = this.packageForm.controls.nights.value;
    pack.idCategory = this.packageForm.controls.category.value;
    pack.notes = this.packageForm.controls.notes.value;
    if (this.package) {
      pack.urlImage = this.package.urlImage;
      pack.urlImageShowCase = this.package.urlImageShowCase;
    } else {
      pack.urlImage = '';
      pack.urlImageShowCase = '';
    }
    // pack.urlImage = this.fileImage;
    // pack.urlImageShowCase = this.fileImageShowCase;
    pack.destiny = this.packageForm.controls.keyword.value;
    pack.amenities = this.packageForm.controls.amenities.value;
    pack.isIncludeHtml = this.packageForm.controls.isIncludeHtml.value === '1';
    if (pack.isIncludeHtml) {
      pack.includeHtml = this.packageForm.controls.includeHtml.value;
    } else {
      pack.includeHtml = '';
    }


    const includeCopy = [...this.includes];

    includeCopy.forEach(element => {
      if (element.new) {
        element.id = '';
      }
    });

    pack.includes = includeCopy;
    pack.isItineraryHtml = this.packageForm.controls.isItineraryHtml.value === '1';

    


    const itinerariesCopy = [];
    let copyItinerary: Itinerary;

    this.itineraries.forEach(itinerary => {
      copyItinerary = new Itinerary();
      copyItinerary.id = itinerary.id;
      copyItinerary.title = itinerary.title;
      copyItinerary.isActive = itinerary.isActive;
      copyItinerary.new = itinerary.new;
      copyItinerary.details = itinerary.details;
      copyItinerary.litinerayPackageDetail = [...itinerary.litinerayPackageDetail];
      itinerariesCopy.push(copyItinerary);
    });


    itinerariesCopy.forEach(itinerary => {
      if (itinerary.new) {
        itinerary.id = '';
      }
      itinerary.litinerayPackageDetail.forEach(detail => {
        if (detail.new) {
          detail.id = '';
        }
      });
    });

    if (pack.isItineraryHtml) {
      pack.itineraryHtml = this.packageForm.controls.itineraryHtml.value;
      pack.itinerary = [];
    } else {
      pack.itineraryHtml = '';
      pack.itinerary = itinerariesCopy;
    }

    let dep: Departure[] = [];
    let pr: Price[] = [];
    let fl: FlightItinerary[] = [];
    let copyPrice: Price;
    let copyDeparture: Departure;

    this.departures.forEach(departure => {
      pr = [];
      departure.prices.forEach(price => {
        fl = [];
        copyPrice = new Price();
        copyPrice.id = price.id;
        copyPrice.isHotelHtml = price.isHotelHtml;
        copyPrice.hotelHtml = price.hotelHtml;
        copyPrice.idHotel = price.idHotel;
        copyPrice.isFlightHtml = price.isFlightHtml;
        copyPrice.flightHtml = price.flightHtml;
        copyPrice.flightItinerary = [...price.flightItinerary];
        copyPrice.single = price.single;
        copyPrice.double = price.double;
        copyPrice.triple = price.triple;
        copyPrice.child = price.child;
        copyPrice.infant = price.infant;
        copyPrice.stock = price.stock;
        copyPrice.stockChild = price.stockChild;
        copyPrice.stockInfant = price.stockInfant;
        copyPrice.isActive = price.isActive;
        copyPrice.new = price.new;
        copyPrice.beginDate = price.beginDate;
        copyPrice.endDate = price.endDate;
        copyPrice.idDeparture = price.idDeparture;
        pr.push(copyPrice);
      });
      copyDeparture = new Departure();
      copyDeparture.id = departure.id;
      copyDeparture.beginDate = departure.beginDate;
      copyDeparture.endDate = departure.endDate;
      copyDeparture.new = departure.new;
      copyDeparture.isActive = departure.isActive;
      copyDeparture.prices = pr;
      dep.push(copyDeparture);
    });

    pack.departures = dep;

    pack.departures.forEach(departure => {
      if (departure.new) {
        departure.id = '';
      }
      departure.beginDate = util.formatddmmyyyy(departure.beginDate);
      departure.endDate = util.formatddmmyyyy(departure.endDate);
      departure.prices.forEach(price => {
        if (price.new) {
          price.id = '';
        }
        price.beginDate = '';
        price.endDate = '';
        price.flightItinerary.forEach(flight => {
          if (flight.new) {
            flight.id = '';
          }
          flight.departure = util.formatddmmyyyy(flight.departure);
          flight.arrive = util.formatddmmyyyy(flight.arrive);
        });
      });
    });

    pack.regulations = this.packageForm.controls.regulations.value;
    pack.conditions = this.packageForm.controls.conditions.value;
    pack.idUser = this.userId;
    pack.expirationDate = util.formatddmmyyyy(this.packageForm.controls.expirationDate.value);

    if (this.update) {
      pack.isActive = this.package.isActive;
    } else {
      pack.isActive = false;
    }

    const form = this.createFormData(pack);
    form.append('fileImage', this.packageForm.controls.fileImage.value);
    form.append('fileImageShowCase', this.packageForm.controls.fileImageShowCase.value);

    console.log(this.createFormData(pack));

    this.sendPackageService(form);
  }

  sendPackageService(form: FormData) {

    if (this.update) {
      this.loading = true;
      this.packageService.updateFormData(form).subscribe(
        x => {
          if (x.confirmation) {
            this.openSnackBar('Paquete actualizado!');
            this.router.navigate(['package/list']);
          } else {
            this.showNotification('Error al actualizar el paquete, por favor solicite la revisión');
          }
         },
        err => {
          console.log('error: ' + err);
          this.showNotification('Error al actualizar el paquete, por favor solicite la revisión');
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    } else {
      this.loading = true;
      this.packageService.saveFormData(form).subscribe(
        x => {
          if (x.confirmation) {
            this.openSnackBar('Paquete registrado!');
            this.router.navigate(['package/list']);
          } else {
            this.showNotification('Error al registrar el paquete, por favor solicite la revisión');
          }
         },
        err => {
          console.log('error: ' + err);
          this.showNotification('Error al registrar el paquete, por favor solicite la revisión');
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
    }
  }


  deepCopy = arr => {
    let copy = [];
    arr.forEach(elem => {
      if (Array.isArray(elem)) {
        copy.push(this.deepCopy(elem));
      } else {
        if (typeof elem === "object") {
          copy.push(this.deepCopyObject(elem));
        } else {
          copy.push(elem);
        }
      }
    });
    return copy;
  };
  
  deepCopyObject = obj => {
    let tempObj = {};
    for (let [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        tempObj[key] = this.deepCopy(value);
      } else {
        if (typeof value === "object") {
          tempObj[key] = this.deepCopyObject(value);
        } else {
          tempObj[key] = value;
        }
      }
    }
    return tempObj;
  };


  showNotification(message: string){
    const dialogRef = this.dialog.open(DialogNotificationComponent, {
      width: '60vh',
      maxHeight: '40vh',
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sendPackage() {
    const formData = new FormData();

    console.log(this.packageForm.controls);

    this.packageForm.controls.isItineraryHtml.setValue(this.packageForm.controls.isItineraryHtml.value === '1');
    this.packageForm.controls.isIncludeHtml.setValue(this.packageForm.controls.isIncludeHtml.value === '1');

    const form = new FormData();

    for (let key in this.packageForm.controls) {

      console.log('key',key);
      console.log('value',this.packageForm.controls[key].value);
      formData.append(key, this.packageForm.controls[key].value);
  }

  // formData.append('departures', form);

  console.log(formData);


    this.packageService.saveFormData(formData).subscribe(
    x => {
      this.openSnackBar('Paquete registrado!');
     },
    err => {
      console.log('error: ' + err);
      this.loading = false;
    },
    () => {
      this.loading = false;
      this.router.navigate(['']);
    }
  );

    // formData.append('UrlImage', this.packageForm.get('imageForm').value);

    // this.packageService.saveFormData(formData).subscribe(
    //   x => {
    //     this.openSnackBar('Paquete registrado!');
    //    },
    //   err => {
    //     console.log('error: ' + err);
    //     this.loading = false;
    //   },
    //   () => {
    //     this.loading = false;
    //     this.router.navigate(['']);
    //   }
    // );
  }

  showErrors() {
    const result = [];
    Object.keys(this.packageForm.controls).forEach(key => {

    const controlErrors: ValidationErrors = this.packageForm.get(key).errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach(keyError => {
        result.push({
          control: key,
          error: keyError,
          value: controlErrors[keyError]
        });
      });
    }
  });

    console.log(result);
  }

  createFormData(object: Object, form?: FormData, namespace?: string): FormData {
    const formData = form || new FormData();
    for (let property in object) {
        if (!object.hasOwnProperty(property) || !object[property]) {
            continue;
        }
        const formKey = namespace ? `${namespace}[${property}]` : property;
        if (object[property] instanceof Date) {
            formData.append(formKey, object[property].toISOString());
        } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
            this.createFormData(object[property], formData, formKey);
        } else {
            formData.append(formKey, object[property]);
        }
    }
    return formData;
}


  sendFormData() {
    const formData = new FormData();
    formData.append('UrlImage', this.packageForm.get('imageForm').value);

    console.log(formData);

    this.packageService.saveFormData(formData).subscribe(
      x => {
        this.openSnackBar('Paquete registrado!');
       },
      err => {
        console.log('error: ' + err);
        this.loading = false;
      },
      () => {
        this.loading = false;
        this.router.navigate(['package/list']);
      }
    );
  }

  getUrlImage(urlImage: string) {
    //demo
    // urlImage = 'https://vacationadminuatsa.blob.core.windows.net/images/paris.png';
    return this.sanitizer.bypassSecurityTrustUrl(urlImage);
  }

  // sendPackage(pack: Package) {
  //   console.log(pack);
  //   this.loading = true;


  //   // var formData: any = new FormData();
  //   // formData.append("name", this.packageForm.get('name').value);
  //   // // formData.append("avatar", this.form.get('avatar').value);

  //   // console.log(formData);

  //   this.packageService.save(pack).subscribe(
  //     x => {
  //       this.openSnackBar('Paquete registrado!');
  //      },
  //     err => {
  //       console.log('error: ' + err);
  //       this.loading = false;
  //     },
  //     () => {
  //       this.loading = false;
  //       this.router.navigate(['']);
  //     }
  //   );

  // }
}
