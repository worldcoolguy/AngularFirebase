import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-playerone',
  templateUrl: './playerone.component.html',
  styleUrls: ['./playerone.component.css']
})
export class PlayeroneComponent implements OnInit {
  items:FirebaseListObservable<any[]>; 
  playerone:FirebaseListObservable<any[]>; 
  newItem = ''; 
  numberOfTries = 0; 

  constructor(private af: AngularFire, public toastr: ToastsManager, vcr: ViewContainerRef) { 
    this.items = this.af.database.list('/items'); 
    this.playerone = this.af.database.list('/playerone'); 
    this.toastr.setRootViewContainerRef(vcr); 
  }

  ngOnInit() {
    this.items.forEach(element => {
      // check to see if input value 
      // matches anwser value stored 
      // in the database
      for (let i = 0; i < element.length; i++) {
        if (element[3].$value == this.newItem.toLowerCase() && this.newItem !== '') {
          this.toastr.info('Player One: That is CORRECT!');
          this.playerone.remove(''); 
          this.playerone.push(this.numberOfTries);
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
    this.items.forEach(element => {
      for (let i = 0; i < element.length; i++) {
        console.log(element[i]);
      }
    });
    if (this.newItem != '') {
      this.numberOfTries++; 
    } 
    this.items.push(''); 
  }
}
