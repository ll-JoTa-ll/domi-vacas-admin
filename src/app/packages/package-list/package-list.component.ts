import { Component, OnInit } from '@angular/core';
import { PackageService } from '../shared/package.service';
import { Package } from '../shared/package.model';
import { Status } from 'src/app/shared/status.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogClonePackageComponent } from '../dialog-clone-package/dialog-clone-package.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.css'],
  providers: [PackageService]
})
export class PackageListComponent implements OnInit {

  name: '';
  packages: Package[];
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  displayedColumns: string[] = [ 'name', 'description', 'isVisible', 'isActive', 'edit', 'copy'];
  dataSource = [];
  searching: boolean;
  updateTable: boolean;
  userId: string;

  constructor(
    private packageService: PackageService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    if (!this.userId || this.userId === '') {
      this.router.navigate(['']);
    } else {
      this.search();
    }
  }

  partner(){
    this.router.navigate(['partner-admin']);
  }

  reports(){
    this.router.navigate(['reports']);
  }

  search() {
    this.searching = true;
    this.packageService.list(this.name ? this.name : '').subscribe(
      x => {
        if (x.confirmation) {
          this.dataSource = x.data;
        }
      },
      err => {
        console.log('error: ' + err);
        this.searching = false;
      },
      () => {
        this.searching = false;
      }
    );
  }

  create() {
    sessionStorage.setItem('packageId', '');
    this.router.navigate(['package/form']);
  }

  edit(id: string) {
    console.log('editar paquete:', id);
    sessionStorage.setItem('packageId', id);
    this.router.navigate(['package/form']);
  }

  changeStatus(pack: Package) {
    console.log(pack);
    const status = new Status();
    status.id = pack.id;
    status.status = pack.isActive;
    this.updateTable = true;
    this.packageService.updateStatus(status).subscribe(
      x => { },
      err => {
        console.log('error: ' + err);
        this.updateTable = false;
      },
      () => {
        this.updateTable = false;
      }
    );
  }

  copy(pack: Package, namePackage: string) {
    this.searching = true;
    const ob = {
      id: pack.id,
      idUser: this.userId,
      name: namePackage
    };
    this.packageService.copy(ob).subscribe(
      x => {
        if (x.confirmation) {
          this.search();
          this.openSnackBar('Paquete duplicado!');
        } else {
          this.openSnackBar('No se pudo duplicar el paquete');
          this.searching = false;
        }
       },
      err => {
        console.log('error: ' + err);
        this.searching = false;
      },
      () => {
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  openCloneDialog(pack: Package): void {
    const dialogRef = this.dialog.open(DialogClonePackageComponent, {
      width: '250px',
      data: pack
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result !== undefined && result !== '') {
        this.copy(pack, result);
      }
    });
  }



  logout() {
    sessionStorage.setItem('userId', '');
    this.router.navigate(['']);
  }
}
