import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  items:FirebaseListObservable<any[]>; 
  playerone:FirebaseListObservable<any[]>; 
  playertwo:FirebaseListObservable<any[]>; 
  newItem = ''; 
  numberOfTries = 0; 
  questionOne = {
      1:'atari',
      2:'apple',
      3:'microsoft', 
      4:'nintendo'
    };
  questionTwo = {
      1:'john papa', 
      2:'steve jobs', 
      3:'douglas engelbart',
      4:'donald trump'
    };

  constructor(private af: AngularFire) { 
    this.items = this.af.database.list('/items'); 
    this.playerone = this.af.database.list('/playerone'); 
    this.playertwo = this.af.database.list('/playertwo'); 
  }

  ngOnInit() {
    this.items.forEach(element => {
      // check to see if input value 
      // matches anwser value stored 
      // in the database
      for (let i = 0; i < element.length; i++) {
        // Guessed question correct
        if (element[3].$value == this.newItem.toLowerCase() && this.newItem !== '') {
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
  reset() {
    console.log(this.question); 
    this.playerone.remove(''); 
    this.playerone.push(0);
    this.playertwo.remove(''); 
    this.playertwo.push(0);
  }
}
