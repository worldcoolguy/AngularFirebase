import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-playertwo',
  templateUrl: './playertwo.component.html',
  styleUrls: ['./playertwo.component.css']
})
export class PlayertwoComponent implements OnInit {
  items:FirebaseListObservable<any[]>; 
  playertwo:FirebaseListObservable<any[]>; 
  newItem = ''; 
  numberOfTries = 0; 

  constructor(private af: AngularFire, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.items = this.af.database.list('/items'); 
    this.playertwo = this.af.database.list('/playertwo'); 
    this.toastr.setRootViewContainerRef(vcr); 
  }

  ngOnInit() {
    this.items.forEach(element => {
      // check to see if input value 
      // matches anwser value stored 
      // in the database
      for (let i = 0; i < element.length; i++) {
        if (element[3].$value == this.newItem.toLowerCase() && this.newItem !== '') {
          this.toastr.info('Player Two: That is CORRECT!')          
          this.playertwo.remove(''); 
          this.playertwo.push(this.numberOfTries);
          this.numberOfTries = 0; 
          this.newItem = '';  
        } else {
          this.newItem = ''; 
        }
        // remove empty values 
        if (element[i].$value == '') {
          this.items.remove(element[i]); 
        }
      }
    });
  }
  checkEntry() {
    if (this.newItem != '') {
      this.numberOfTries++; 
    } 
    this.items.push(''); 
  }
}
