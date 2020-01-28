import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  gameStarted = false;
  playerList;
  currentPlayer: string;
  playerIterator = 0;
  roundNumber = 1;
  throwNum = 1;
  dartOne;
  dartTwo;
  dartThree;
  moreDarts = true;
  twentyClosed = false;
  nineteenClosed = false;
  eighteenClosed = false;
  seventeenlosed = false;
  sixteenClosed = false;
  fifteenClosed = false;
  bullseyeClosed = false;
  constructor(public dataService: DataService) { }
  ngOnInit() {
    // this.playerList = this.dataService.getPlayers();
   this.playerList = ['Gabe', 'Paul', 'Luke', 'Bryan'];
    this.currentPlayer = this.playerList[this.playerIterator];
  }


  start(event) {
    this.gameStarted = true;
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
    const previous = confirm('Do you want to go back to previous player and re-enter their round?');
    if (previous === true) {
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
    }
    }
  onHit20(event) {
    console.log('Hit 20');
    if (this.throwNum <= 3 && this.twentyClosed === false) {
      this.addScore(20);
    }
    this.processThrow();
  }
  onHit19(event)  {
    console.log('Hit 19');
  }
  onHit18(event)  {
    console.log('Hit 18');
  }
  onHit17(event)  {
    console.log('Hit 17');
  }
  onHit16(event)  {
    console.log('Hit 16');
  }
  onHit15(event)  {
    console.log('Hit 15');
  }
  onHitBullseye(event)  {
    console.log('BOOM');
  }
  onMiss(event)  {
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
  }

  addScore(num)  {
console.log('You got ' + num + ' points.');
  }

}
