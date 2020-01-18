import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Include } from '../shared/include.model';
import { IncludeService } from '../shared/include.service';
import { Icon } from '../shared/icon.model';
import * as util from '../../shared/util';

@Component({
  selector: 'app-include-form',
  templateUrl: './include-form.component.html',
  styleUrls: ['./include-form.component.css'],
  providers: [ IncludeService ]
})
export class IncludeFormComponent implements OnInit {

  includeForm: FormGroup;
  submitted: boolean;
  icons: Icon[];
  loading: boolean;
  iconSelected: Icon = new Icon();
  utils: any;
  update: boolean;
  title = 'Crear Incluye';

  constructor(
    public dialogRef: MatDialogRef<IncludeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Include,
    private formBuilder: FormBuilder,
    private includeService: IncludeService
  ) { }

  ngOnInit() {
    this.utils = util;
    this.initForm();
    this.getIcons();
  }

  getIcons() {
    this.loading = true;
    this.includeService.getIcons().subscribe(
      x => {
        if (x.confirmation) {
          this.icons = x.data;
          console.log(this.icons);
        }
      },
      err => {
        console.log('error: ' + err);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  initForm() {

    let title = '';
    let description = '';
    let icon = '';
    if (this.data.id !== undefined) {
      this.update = true;
      this.title = 'Editar Incluye';
      title = this.data.title;
      description = this.data.description;
      icon = this.data.idIcon;
      this.iconSelected.id = this.data.idIcon;
      this.iconSelected.name = this.data.icon;
    }

    this.includeForm = this.formBuilder.group({
      title: [title, Validators.required],
      description: [description, Validators.required],
      icon: [icon, Validators.required]
    });
  }

  selectIcon(icon: Icon) {
    this.iconSelected = icon;
    this.includeForm.controls.icon.setValue(icon.id);
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

  save() {
    this.submitted = true;
    console.log(this.includeForm.value);

    console.log(this.submitted);
    console.log(this.iconSelected);

    if (this.includeForm.invalid || !this.iconSelected) {
      return;
    }

    const include = new Include();
    if (this.update) {
      include.id = this.data.id;
    } else {
      include.id = '';
    }
    include.title = this.includeForm.controls.title.value;
    include.description = this.includeForm.controls.description.value;
    include.icon = this.iconSelected.name;
    include.idIcon = this.iconSelected.id;
    this.dialogRef.close(include);
  }

}
