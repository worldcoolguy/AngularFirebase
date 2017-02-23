import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

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

  constructor(private af: AngularFire) { 
    this.items = this.af.database.list('/items'); 
    this.playertwo = this.af.database.list('/playertwo'); 
  }

  ngOnInit() {
    this.items.forEach(element => {
      // check to see if input value 
      // matches anwser value stored 
      // in the database
      for (let i = 0; i < element.length; i++) {
        if (element[3].$value == this.newItem.toLowerCase() && this.newItem !== '') {
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
