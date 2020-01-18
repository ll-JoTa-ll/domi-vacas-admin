import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Itinerary } from '../shared/itinerary.model';
import { ItineraryDetail } from '../shared/itinerary-detail.model';

@Component({
  selector: 'app-itinerary-detail-form',
  templateUrl: './itinerary-detail-form.component.html',
  styleUrls: ['./itinerary-detail-form.component.css']
})
export class ItineraryDetailFormComponent implements OnInit {

  itineraryForm: FormGroup;
  submitted: boolean;
  idItineraryDetail = '';
  details: ItineraryDetail[] = [];
  dataSource = [];
  displayedColumns: string[] = [
    'title', 'description', 'edit', 'delete'
  ];

  constructor(
    public dialogRef: MatDialogRef<ItineraryDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Itinerary,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.details = this.data.litinerayPackageDetail;
    this.refreshItinerary();
    this.itineraryForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  isInvalid(control, touched: boolean) {
    return touched ? this.submitted || (control.touched && control.errors != null) : this.submitted && control.errors != null;
  }

  getErrorMessage(control) {
    return control.hasError('required') ? 'Campo requerido' :
    control.hasError('email') ? 'Correo no válido' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addItinerary() {

    this.submitted = true;

    if (this.itineraryForm.invalid) {
      return;
    }

    const detail = new ItineraryDetail();
    detail.id = (this.details.length + 1).toString();
    detail.new = true;
    detail.isActive = true;
    detail.title = this.itineraryForm.controls.title.value;
    detail.description = this.itineraryForm.controls.description.value;
    this.details.push(detail);
    this.refreshItinerary();
    this.itineraryForm.reset();
  }

  editItinerary(itinerary: ItineraryDetail) {
    this.idItineraryDetail = itinerary.id;
    this.itineraryForm.controls.title.setValue(itinerary.title);
    this.itineraryForm.controls.description.setValue(itinerary.description);
  }

  onUpdateItinerary() {
    this.details.forEach(element => {
      if (element.id === this.idItineraryDetail) {
        element.title = this.itineraryForm.controls.title.value;
        element.description = this.itineraryForm.controls.description.value;
      }
    });
    this.resetItinerary();
  }

  removeItinerary(itineraryDetail: ItineraryDetail) {
    if (itineraryDetail.new) {
      this.details = this.details.filter(x => x.id !== itineraryDetail.id);
    } else {
      itineraryDetail.isActive = false;
    }
    this.refreshItinerary();
  }

  refreshItinerary() {
    console.log(this.details);
    this.dataSource = [...this.details.filter(x => x.isActive === true)];
  }

  resetItinerary() {
    this.idItineraryDetail = '';
    this.itineraryForm.reset();
  }

  save() {
    this.data.litinerayPackageDetail = this.details;
    this.data.details = this.details.filter(x => x.isActive === true).length;
    console.log('details: ', this.data.details);
    this.dialogRef.close(this.data);
  }

}
