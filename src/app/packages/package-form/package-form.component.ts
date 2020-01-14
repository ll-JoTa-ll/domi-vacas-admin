import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
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

@Component({
  selector: 'app-package-form',
  templateUrl: './package-form.component.html',
  styleUrls: ['./package-form.component.css'],
  providers: [ CategoryService, PackageService ]
})
export class PackageFormComponent implements OnInit {

  utils: any;
  packageForm: FormGroup;
  submitted: boolean;
  categories: Select[] = [];
  amenities: Select[] = [];
  urlImageMethod: string;
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
    'beginDate', 'endDate', 'hotel'
    , 'simple', 'double', 'triple'
    , 'child', 'infant', 'stock'
    , 'flight', 'edit'
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

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private packageService: PackageService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private  ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit() {
    this.initConfig();
    this.initForm();
    this.loadInfo();
    this.utils = util;
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
      err => { console.log('error: ' + err); },
      () => {
        this.getAmenities();
      }
    );
  }

  getAmenities() {
    this.packageService.listAmenities().subscribe(
      x => {
        if (x.confirmation) {
          this.amenities = x.data;
        }
      },
      err => { console.log('error: ' + err); },
      () => {
        this.loading = false;
      }
    );
  }

  /**
   * InitConfig
   */
  initConfig() {
    this.urlImageMethod = config.getUploadImageUrl(config.PACKAGE_UPLOAD_IMAGE_METHOD);
  }

  initForm() {
    this.packageForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      days: ['', Validators.required],
      nights: ['', Validators.required],
      discount: [''],
      inShowCase: [''],
      category: ['', Validators.required],
      keyword: ['', Validators.required],
      notes: [''],
      // salesDate: ['', Validators.required],
      image: [''],
      imageShowCase: [''],
      amenities: new FormArray([]),
      isIncludeHtml: ['1'],
      includeHtml: [''],
      isItineraryHtml: ['1'],
      itineraryHtml: [''],
      conditions: ['', Validators.required],
      restrictions: ['', Validators.required],
      urlImage: ['', Validators.required],
      urlImageShowCase: ['', Validators.required],
      itineraryTitle: [''],
      // imageForm: ['']
    });
  }

  /**
   * Datos generales
   */

  onFileChangeImage(event, field) {
    console.log(this.packageForm.value);
    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      const file = event.target.files[0];

      // this.packageForm.get('urlImage').setValue(file);

      // this.imagetype = file.type;
      // this.imagesize = file.size;
      // this.imagename = file.name;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(reader.result);
          this.fileImage = reader.result;
      };

      // let b = this.converter(event.target.files[0]);
      // this.fileImage = b;
      // console.log('imagefile',this.fileImage);

      // const [file] = event.target.files;
      // // just checking if it is an image, ignore if you want
      // if (!file.type.startsWith('urlImage')) {
      //   this.packageForm.get(field).setErrors({
      //     required: true
      //   });
      //   this.cd.markForCheck();
      // } else {
      //   // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
      //   this.packageForm.patchValue({
      //     [field]: file
      //   });
      //   // need to run CD since file load runs outside of zone
      //   this.cd.markForCheck();
      // }
    }
  }

  onFileChangeImageShowCase(event, field) {
    console.log(this.packageForm.value);
    if (event.target.files && event.target.files.length) {
      console.log(event.target.files);
      const file = event.target.files[0];

      // this.packageForm.get('urlImage').setValue(file);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          console.log(reader.result);
          this.fileImageShowCase = reader.result;
      };
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
    control.hasError('email') ? 'Not a valid email' : '';
  }



  /**
   * Precios
   */

  addPrice() {
    console.log('opendialog');
    let price: Price;
    this.openDialog(price);
  }

  editPrice(idPrice: number) {
  }

  openDialog(price: Price): void {
    const dialogRef = this.dialog.open(PriceFormComponent, {
      width: '80vh',
      maxHeight: '90vh',
      data: { price }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.loadPrice(result);
    });
  }

  loadPrice(price: Price) {
    if (price) {
      const index = this.departures.findIndex(x => (x.beginDate === price.beginDate && x.endDate === price.endDate));
      if (index >= 0) {
        this.departures[index].prices.push(price);
      } else {
        const departure = new Departure();
        departure.id = this.departures.length + 1;
        departure.beginDate = price.beginDate;
        departure.endDate = price.endDate;
        departure.prices = [price];
        this.departures.push(departure);
      }
      this.prices.push(price);
      this.refreshTable();
      console.log(this.departures);
      console.log(this.dataSource);
    }
  }

  refreshTable() {
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
    console.log('editar include: ' + id);
    console.log(this.includes);
    const include = this.includes.find(x => x.id === id);
    console.log(include);
    this.openIncludeDialog(include);
  }

  removeInclude(id: string) {
    /**
     * show dialog
     */
    this.includes = this.includes.filter(x => x.id !== id);
    this.includeDataSource = [...this.includes];
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
    console.log('return', include);
    if (include) {
      if (include.id !== '') {
        console.log('return editar');

        this.includes.forEach(element => {
          if (element.id === include.id) {
            element.title = include.title;
            element.description = include.description;
            element.iconId = include.iconId;
            element.icon = include.icon;
          }
        });
      } else {
        console.log('return nuevo');
        include.id = (this.includes.length + 1).toString();
        this.includes.push(include);
      }
      console.log('updateincludes', this.includes);
      this.includeDataSource = [...this.includes];
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
    itinerary.title = this.packageForm.controls.itineraryTitle.value;
    itinerary.litinerayPackageDetail = [];
    this.itineraries.push(itinerary);
    this.itineraryDataSource = [...this.itineraries];
    this.packageForm.controls.itineraryTitle.setValue('');
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
          element.litinerayPackageDetail = itinerary.litinerayPackageDetail;
        }
      });
      console.log('updateitineraries', this.itineraries);
      this.itineraryDataSource = [...this.itineraries];
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

  removeItinerary(id: string) {
    this.itineraries = this.itineraries.filter(x => x.id !== id);
    this.itineraryDataSource = [...this.itineraries];
  }

  /**
   * Save
   */

  save() {

    this.submitted = true;

    if (this.packageForm.invalid) {
      this.openSnackBar('Error con algun campo');
      console.log(this.showErrors());
      return;
    }

    console.log(this.departures);
    console.log(this.departures.length);
    if (this.departures.length <= 0) {
      this.openSnackBar('Debe ingresar al menos un precio');
      return;
    }

    if (this.packageForm.controls.isIncludeHtml.value === '2' && this.includes.length <= 0) {
      this.openSnackBar('Debe ingresar al menos un incluye');
      return;
    }

    if (this.packageForm.controls.isItineraryHtml.value === '2' && this.itineraries.length <= 0) {
      this.openSnackBar('Debe ingresar al menos un itinerario');
      return;
    }

    // console.log(this.packageForm.value);
    const pack = new Package();
    pack.name = this.packageForm.controls.name.value;
    pack.description = this.packageForm.controls.description.value;
    pack.discount = 0;
    pack.isActive = false;
    pack.isVisible = this.packageForm.controls.inShowCase.value === '' ? false : this.packageForm.controls.inShowCase.value;
    pack.days = this.packageForm.controls.days.value;
    pack.nights = this.packageForm.controls.nights.value;
    pack.idCategory = this.packageForm.controls.category.value;
    pack.notes = this.packageForm.controls.notes.value;
    // pack.urlImage = this.packageForm.controls.image.value;
    // pack.urlImageShowCase = this.packageForm.controls.imageShowCase.value;
    pack.urlImage = this.fileImage;
    pack.urlImageShowCase = this.fileImageShowCase;
    pack.destiny = this.packageForm.controls.keyword.value;
    // pack.saleDate = this.packageForm.controls.salesDate.value;
    // pack.saleDate = util.formatddmmyyyy(this.packageForm.controls.salesDate.value);
    pack.amenities = this.packageForm.controls.amenities.value;
    pack.isIncludeHtml = this.packageForm.controls.isIncludeHtml.value === '1';
    pack.includeHtml = this.packageForm.controls.includeHtml.value;
    pack.includes = this.includes;
    pack.isItineraryHtml = this.packageForm.controls.isItineraryHtml.value === '1';
    pack.itineraryHtml = this.packageForm.controls.itineraryHtml.value;
    pack.itinerary = this.itineraries;
    pack.departures = this.departures;
    pack.regulations = this.packageForm.controls.restrictions.value;
    pack.conditions = this.packageForm.controls.conditions.value;

    console.log(pack);
    // this.sendPackage(pack);

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
        this.router.navigate(['']);
      }
    );
  }

  sendPackage(pack: Package) {
    console.log(pack);
    this.loading = true;


    // var formData: any = new FormData();
    // formData.append("name", this.packageForm.get('name').value);
    // // formData.append("avatar", this.form.get('avatar').value);

    // console.log(formData);

    this.packageService.save(pack).subscribe(
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

  }
}
