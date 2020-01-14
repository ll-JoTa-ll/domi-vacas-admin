import { Component, OnInit } from '@angular/core';
import { PackageService } from '../shared/package.service';
import { Package } from '../shared/package.model';
import { Status } from 'src/app/shared/status.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

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
  displayedColumns: string[] = [ 'name', 'description', 'isVisible', 'isActive', 'edit'];
  dataSource = [];
  searching: boolean;
  updateTable: boolean;

  constructor(
    private packageService: PackageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.search();
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
    this.searching = false;
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

  edit(id: number) {
    console.log(id);
  }

}
