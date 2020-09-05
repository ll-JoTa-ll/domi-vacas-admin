import { Component, OnInit } from '@angular/core';
import { CharterService } from '../shared/charterService.model';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-charters-list',
  templateUrl: './charters-list.component.html',
  styleUrls: ['./charters-list.component.css'],
  providers: [ CharterService]
})
export class ChartersListComponent implements OnInit {

  searching: boolean;
  dataSource = [];
  displayedColumns: string[] = [ 'title', 'citys', 'airline', 'dateDeparture', 'dateDue', 'gds', 'requiredVisa' , 'copy'];

  constructor(private charterService: CharterService,private router: Router,
              private sessionService: SessionService) { }

  ngOnInit() {
    this.getCharters();
  }

  getCharters(){
    this.searching = true;
    this.charterService.listServices().subscribe(
      x => {
        this.dataSource = x;
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

  getCharterPassenger(priceId,title){
    this.charterService.getCharterPassenger(priceId).subscribe(
      result => {
        const data = {
          listado: result,
          titulo: title
        }
        this.sessionService.setCharterDetail(data);
        this.router.navigate(['charterDetail']);
      }
    )
  }

}
