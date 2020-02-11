import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../data.service';
import {CricketPlayer} from '../../models/cricket-player';
import {CricketTeam} from '../../models/cricket-team';
import {CricketRound} from '../../models/cricket-round';
import {CricketGame} from '../../models/cricket-game';
import {CricketTeamGame} from '../../models/cricket-team-game';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  playerOne: CricketPlayer;
  playerTwo: CricketPlayer;
  playerThree: CricketPlayer;
  playerFour: CricketPlayer;

  homeTeam: CricketTeam;
  awayTeam: CricketTeam;

  teams: CricketTeam[] = [];
  homeTeamGame: CricketTeamGame;
  awayTeamGame: CricketTeamGame;
  currentRound: CricketRound;
  key: any;
  gameStarted = false;
  playerList: CricketPlayer[] = [];
  playerIdList: number[] = [];
  currentPlayer: CricketPlayer;
  currentPlayerId: number;
  playerIterator = 0;
  playerIdIterator = 0;
  roundNumber = 1;
  throwNum = 1;
  dartOne;
  dartTwo;
  dartThree;
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
    if (event.key === '1') {this.onHit20(20); }
    else if (event.key === '2' )  {this.onHit19(19); }
    else if (event.key === '3' )  {this.onHit18(18); }
    else if (event.key === '4' )  {this.onHit17(17); }
    else if (event.key === '5' )  {this.onHit16(16); }
    else if (event.key === '6' )  {this.onHit15(15); }
    else if (event.key === '7' )  {this.onHitBullseye(25); }
    else if (event.key === 'p' )  {this.onPrevPlayer(); }
    else if (event.key === 'n' )  {this.onNextPlayer(); }
    else if (event.key === '0' )  {this.onMiss(0); }
    else if (event.key === 's' )  {this.makeSingle(); }
    else if (event.key === 'd' )  {this.makeDouble(); }
    else if (event.key === 't' )  {this.makeTriple(); }
    else if (event.key === 'u' )  {this.undoThrow(); }
    else if (event.key === 'i' )  {this.undoTurn(); }
  }

  constructor(public dataService: DataService) { }
  ngOnInit() {
    this.playerOne = new CricketPlayer('Gabe', 'Altenhofen', 1, 1);
    this.playerTwo = new CricketPlayer('Luke', 'Lorenz', 2, 1);
    this.playerThree = new CricketPlayer('Paul', 'Loftis', 3, 2);
    this.playerFour = new CricketPlayer('Bryan', 'Swalley', 4, 2);
    this.homeTeam = new CricketTeam(1, 'The Donnybrooks', this.playerOne, this.playerTwo, true);
    this.awayTeam = new CricketTeam(2, 'Merica', this.playerThree, this.playerFour, false);
    // this.teams = [this.awayTeam, this.homeTeam]

    this.awayTeamGame = new CricketTeamGame(this.awayTeam);
    this.homeTeamGame = new CricketTeamGame(this.homeTeam);
  }

  /*getPlayerList(cricketGame) {
    const self = this;
    cricketGame.teams.forEach(function(item) {
      self.playerList.push(item.playerOne);
      self.playerIdList.push(item.playerOne.playerId);
    });
    cricketGame.teams.forEach(function(item) {
      self.playerList.push(item.playerTwo);
      self.playerIdList.push(item.playerTwo.playerId);
    });
    console.log('playerIdlist: ', this.playerIdList);
  }*/

  getPlayerList(awayTeam, HomeTeam) {
    this.playerList.push(this.awayTeamGame.team.playerOne);
    this.playerList.push(this.homeTeamGame.team.playerOne);
    this.playerList.push(this.awayTeamGame.team.playerTwo);
    this.playerList.push(this.homeTeamGame.team.playerTwo);
  }

  onButtonPress(value) {
    console.log('Value', value);
  }
  start(event) {
    this.gameStarted = true;
    this.setOrder();
    this.startNewRound();
  }

  setOrder() {
    this.getPlayerList(this.awayTeamGame, this.homeTeamGame);
    this.currentPlayer = this.playerList[this.playerIterator];
    this.currentPlayerId = this.playerIdList[this.playerIdIterator];
  }

  startNewRound() {
  this.currentRound = new CricketRound(this.currentPlayer.playerId, this.currentPlayer.teamId);
  console.log('currentRound: ', this.currentRound);
  }

  makeSingle() {
    this.showSingles = true;
    this.showDoubles = false;
    this.showTriples = false;
  }

  makeDouble() {
    this.showSingles = false;
    this.showDoubles = true;
    this.showTriples = false;
  }

  makeTriple() {
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
    this.startNewRound();
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

  undoThrow() {}
  undoTurn() {}

  getCurrentTeam(){
  }

  onHit20(multiplier) {
    if (this.currentRound.teamId === this.awayTeamGame.team.teamId) { 
      if (this.throwNum <= 3 && this.awayTeamGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.twenties++;

          this.addScore(20);
        }
        if (this.awayTeamGame.twenties > 2) {
          console.log('You closed the twenties');
        }
      }
      this.processThrow();
      console.log('Away Team twenties: ', this.awayTeamGame.twenties);
    }
    else if (this.currentRound.teamId === this.homeTeamGame.team.teamId) { 
      if (this.throwNum <= 3 && this.homeTeamGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.twenties++;

          this.addScore(20);
        }
        if (this.homeTeamGame.twenties > 2) {
          console.log('You closed the twenties');
        }
      }
      this.processThrow();
      console.log('onHit20 twenties: ', this.homeTeamGame.twenties);
    }
  }
  onHit19(multiplier) {
    if (this.currentRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.nineteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.nineteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.nineteens > 2) {
          console.log('You closed the nineteens');
        }
      }
      this.processThrow();
      console.log('Away Team nineteens: ', this.awayTeamGame.nineteens);
    }
    else if (this.currentRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.nineteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.nineteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.nineteens > 2) {
          console.log('You closed the nineteens');
        }
      }
      this.processThrow();
      console.log('onHit20 nineteens: ', this.homeTeamGame.nineteens);
    }
  }

  onHit18(multiplier) {
    if (this.currentRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.eighteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.eighteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.eighteens > 2) {
          console.log('You closed the eighteens');
        }
      }
      this.processThrow();
      console.log('Away Team eighteens: ', this.awayTeamGame.eighteens);
    }
    else if (this.currentRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.eighteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.eighteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.eighteens > 2) {
          console.log('You closed the eighteens');
        }
      }
      this.processThrow();
      console.log('onHit20 eighteens: ', this.homeTeamGame.eighteens);
    }
  }

  onHit17(multiplier) {
    if (this.currentRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.seventeenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.seventeens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.seventeens > 2) {
          console.log('You closed the seventeens');
        }
      }
      this.processThrow();
      console.log('Away Team seventeens: ', this.awayTeamGame.seventeens);
    }
    else if (this.currentRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.seventeenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.seventeens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.seventeens > 2) {
          console.log('You closed the seventeens');
        }
      }
      this.processThrow();
      console.log('onHit20 seventeens: ', this.homeTeamGame.seventeens);
    }
  }
  onHit16(multiplier) {
    if (this.currentRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.sixteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.sixteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.sixteens > 2) {
          console.log('You closed the sixteens');
        }
      }
      this.processThrow();
      console.log('Away Team sixteens: ', this.awayTeamGame.sixteens);
    }
    else if (this.currentRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.sixteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.sixteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.sixteens > 2) {
          console.log('You closed the sixteens');
        }
      }
      this.processThrow();
      console.log('onHit20 sixteens: ', this.homeTeamGame.sixteens);
    }
  }
  onHit15(multiplier) {
    if (this.currentRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.fifteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.fifteens++;

          this.addScore(20);
        }
        if (this.awayTeamGame.fifteens > 2) {
          console.log('You closed the fifteens');
        }
      }
      this.processThrow();
      console.log('Away Team fifteens: ', this.awayTeamGame.fifteens);
    }
    else if (this.currentRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.fifteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.fifteens++;

          this.addScore(20);
        }
        if (this.homeTeamGame.fifteens > 2) {
          console.log('You closed the fifteens');
        }
      }
      this.processThrow();
      console.log('onHit20 fifteens: ', this.homeTeamGame.fifteens);
    }
  }
  onHitBullseye(multiplier) {
    if (this.currentRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.awayTeamGame.bullseyeClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.bullseyes++;

          this.addScore(20);
        }
        if (this.awayTeamGame.bullseyes > 2) {
          console.log('You closed the bullseyes');
        }
      }
      this.processThrow();
      console.log('Away Team bullseyes: ', this.awayTeamGame.bullseyes);
    }
    else if (this.currentRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.throwNum <= 3 && this.homeTeamGame.bullseyeClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.bullseyes++;

          this.addScore(20);
        }
        if (this.homeTeamGame.bullseyes > 2) {
          console.log('You closed the bullseyes');
        }
      }
      this.processThrow();
      console.log('onHit20 bullseyes: ', this.homeTeamGame.bullseyes);
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
