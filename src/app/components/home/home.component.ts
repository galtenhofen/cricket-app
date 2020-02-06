import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../data.service';
import {CricketPlayer} from '../../models/cricket-player';
import {CricketTeam} from '../../models/cricket-team';
import {CricketRound} from '../../models/cricket-round';
import {CricketGame} from '../../models/cricket-game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  key: any;
  gameStarted = false;
  playerList;
  currentPlayer: string;
  playerIterator = 0;
  roundNumber = 1;
  throwNum = 1;
 /* dartOne;
  dartTwo;
  dartThree;*/
  moreDarts = true;
  twentyClosed = false;
  nineteenClosed = false;
  eighteenClosed = false;
  seventeenClosed = false;
  sixteenClosed = false;
  fifteenClosed = false;
  bullseyeClosed = false;
  twenties = 0;
  nineteens = 0;
  eighteens = 0;
  seventeens = 0;
  sixteens = 0;
  fifteens = 0;
  bullseyes = 0;

  showSingles = true;
  showDoubles = false;
  showTriples = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key === '1'){this.onHit20(20)}
    else if (event.key === '2' )  {this.onHit19(19)}
    else if (event.key === '3' )  {this.onHit18(18)}
    else if (event.key === '4' )  {this.onHit17(17)}
    else if (event.key === '5' )  {this.onHit16(16)}
    else if (event.key === '6' )  {this.onHit15(15)}
    else if (event.key === '7' )  {this.onHitBullseye(25)}
    else if (event.key === 'p' )  {this.onPrevPlayer()}
    else if (event.key === 'n' )  {this.onNextPlayer()}
    else if (event.key === '0' )  {this.onMiss(0)}
    else if (event.key === 's' )  {this.makeSingle()}
    else if (event.key === 'd' )  {this.makeDouble()}
    else if (event.key === 't' )  {this.makeTriple()}
   /* else if(event.key == "59" ){this.onButtonPress(9)}
    else if(event.key == "60" ){this.onButtonPress(10)}
    else if(event.key == "75" ){this.onButtonPress(11)}
    else if(event.key == "76" ){this.onButtonPress(12)}
    else if(event.key == "77" ){this.onButtonPress(13)}
    else if(event.key == "78" ){this.onButtonPress(14)}
    else if(event.key == "79" ){this.onButtonPress(15)}
    else if(event.key == "80" ){this.onButtonPress(16)}
    else if(event.key == "81" ){this.onButtonPress(17)}
    else if(event.key == "82" ){this.onButtonPress(18)}
    else if(event.key == "83" ){this.onButtonPress(19)}
    else if(event.key == "84" ){this.onButtonPress(20)}
    else if(event.key == "85" ){this.onButtonPress(25)}
    else if(event.key == "86" ){this.onButtonPress(50)}
    else if(event.key == "87" ){this.onButtonPress(0)}
    else if(event.key == "88" ){this.onButtonPress(0)}
    else if(event.key == "89" ){this.onButtonPress(0)}
    else if(event.key == "90"){this.onButtonPress(0)}*/
  }

  constructor(public dataService: DataService) { }
  ngOnInit() {
    const cricketGame = new CricketGame();
    const teamOne = new CricketTeam(1,'The Donnybrooks',1,2);
    const teamTwo = new CricketTeam(2, 'Merica',3,4);
    const playerOne = new CricketPlayer('Gabe', 'Altenhofen', 1,1)
    const playerTwo = new CricketPlayer('Luke', 'Lorenz', 2,1)
    const playerThree = new CricketPlayer('Paul', 'Loftis', 3,2)
    const playerFour = new CricketPlayer('Bryan', 'Swalley', 4,2)

   this.playerList = ['Gabe', 'Paul', 'Luke', 'Bryan'];
    this.currentPlayer = this.playerList[this.playerIterator];
    console.log('teamOne: ', teamOne);
    console.log('playerOne: ', playerOne);
  }

  onButtonPress(value) {
    console.log('Value', value);
  }
  start(event) {
    this.gameStarted = true;
    this.setOrder();
  }

  setOrder(){

  }

  makeSingle(){
    this.showSingles = true;
    this.showDoubles = false;
    this.showTriples = false;
  }

  makeDouble(){
    this.showSingles = false;
    this.showDoubles = true;
    this.showTriples = false;
  }

  makeTriple(){
    this.showSingles = false;
    this.showDoubles = false;
    this.showTriples = true;
  }

  onNextPlayer() {
    if (this.playerIterator < 3) {
      this.playerIterator++;
      this.currentPlayer = this.playerList[this.playerIterator];
    }  else {
      this.playerIterator = 0;
      this.currentPlayer = this.playerList[this.playerIterator];
      this.roundNumber++;
    }
    this.moreDarts = true;
      this.throwNum = 1;
  }

  onPrevPlayer() {
    // const previous = confirm('Do you want to go back to previous player and re-enter their round?');
   // if (previous === true) {
      if (this.playerIterator > 0) {
        this.playerIterator--;
        this.currentPlayer = this.playerList[this.playerIterator];
      } else {
        if (this.roundNumber > 1 ) {
          this.playerIterator = 3;
          this.currentPlayer = this.playerList[this.playerIterator];
          this.roundNumber--;
        }  else {
          alert('This is the first player.');
        }
      }
      this.moreDarts = true;
      this.throwNum = 1;
   // }
}
  onHit20(multiplier) {
      if (this.throwNum <= 3 && this.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.twenties++;

        this.addScore(20);
        }
        if (this.twenties > 2) {
          console.log('You closed the twenties');
        }
      }
      this.processThrow();
      console.log('onHit20 twenties: ', this.twenties);
  }
  onHit19(multiplier)  {
    if (this.throwNum <= 3 && this.nineteenClosed === false) {
      for (let i = 0; i < multiplier; i++) {
        this.nineteens++;

      this.addScore(19);
      }
    }
    this.processThrow();
  }
  onHit18(multiplier)  {
    if (this.throwNum <= 3 && this.eighteenClosed === false) {
      for (let i = 0; i < multiplier; i++) {
        this.eighteens++;
        this.addScore(18);
      }
    }
    this.processThrow();
  }
  onHit17(multiplier)  {
    if (this.throwNum <= 3 && this.seventeenClosed === false) {
      for (let i = 0; i < multiplier; i++) {
        this.seventeens++;
        this.addScore(17);
      }
    }
    this.processThrow();
  }
  onHit16(multiplier)  {
    if (this.throwNum <= 3 && this.sixteenClosed === false) {
      for (let i = 0; i < multiplier; i++) {
        this.sixteens++;
        this.addScore(16);
      }
    }
    this.processThrow();
  }
  onHit15(multiplier)  {
    if (this.throwNum <= 3 && this.fifteenClosed === false) {
      for (let i = 0; i < multiplier; i++) {
        this.fifteens++;
        this.addScore(15);
      }
    }
        this.processThrow();
    }
  onHitBullseye(multiplier) {
        if (this.throwNum <= 3 && this.bullseyeClosed === false) {
          for (let i = 0; i < multiplier; i++) {

            this.bullseyes++;
            this.addScore(25);
          }
          this.processThrow();
        }
      }
  onMiss(multiplier)  {
    if (this.throwNum <= 3) {
      this.addScore(0);
    }
    this.processThrow();
    console.log('You suck.');
  }

  processThrow() {
    this.throwNum++;
    if (this.throwNum < 4 ) {
    }  else {
      this.moreDarts = false;
    }
    this.makeSingle();
  }

  addScore(num)  {
console.log('You got ' + num + ' points.');
  }

}
