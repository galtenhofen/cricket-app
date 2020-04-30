import { Component, OnInit, HostListener } from '@angular/core';
import { DataService } from '../../data.service';
import {CricketPlayer} from '../../models/cricket-player';
import {CricketTeam} from '../../models/cricket-team';
import {CricketRoundTeam} from '../../models/cricket-round-team';
import {CricketRound} from '../../models/cricket-round';
import {CricketGame} from '../../models/cricket-game';
import {CricketTeamGame} from '../../models/cricket-team-game';
import {CricketHit} from '../../models/cricket-hit';
import Swal from 'sweetalert2';
import {forEachComment} from 'tslint';

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
  availablePlayers;
  homeTeam: CricketTeam;
  awayTeam: CricketTeam;
  numPlayers = 0;
  teams: CricketTeam[] = [];
  homeTeamGame: CricketTeamGame;
  awayTeamGame: CricketTeamGame;
  firstPlayerGame: CricketGame;
  secondPlayerGame: CricketGame;
  currentTeamRound: CricketRoundTeam;
  currentRound: CricketRound;
  key: any;
  inOrder = false;
  quickStart = true;
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
  multiplier = 1;
  showSingles = true;
  showDoubles = false;
  showTriples = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === '1') {this.onHit20(this.multiplier); } else if (event.key === '2' )  {this.onHit19(this.multiplier); } else if (event.key === '3' )  {this.onHit18(this.multiplier); } else if (event.key === '4' )  {this.onHit17(this.multiplier); } else if (event.key === '5' )  {this.onHit16(this.multiplier); } else if (event.key === '6' )  {this.onHit15(this.multiplier); } else if (event.key === '7' )  {this.onHitBullseye(this.multiplier); } else if (event.key === 'p' )  {this.onPrevPlayer(); } else if (event.key === 'n' )  {this.onNextPlayer(); } else if (event.key === '0' )  {this.onMiss(); } else if (event.key === 's' )  {this.showSingle(); } else if (event.key === 'd' )  {this.toggleDouble(); } else if (event.key === 't' )  {this.toggleTriple(); } else if (event.key === 'u' )  {this.undoThrow(); } else if (event.key === 'i' )  {this.undoTurn(); }
  }

  constructor(public dataService: DataService) { }
  ngOnInit() {
    this.availablePlayers = this.dataService.getPlayers();

  }

  getPlayerListTeam(awayTeam, HomeTeam) {
    this.playerList.push(this.awayTeamGame.team.playerOne);
    this.playerList.push(this.homeTeamGame.team.playerOne);
    this.playerList.push(this.awayTeamGame.team.playerTwo);
    this.playerList.push(this.homeTeamGame.team.playerTwo);
  }

  getPlayerList(currentPlayers) {
    console.log('***Enter setPlayerList');
    currentPlayers.forEach(function(item) {
      const newPlayer = new CricketPlayer(item.firstName, item.lastName, item.playerId);
      this.playerList.push(newPlayer);
    });
    console.log('this.playerList', this.playerList);
  }

  setQuickstartPlayerList() {
    this.playerList.push(this.firstPlayerGame.player);
    this.playerList.push(this.secondPlayerGame.player);
  }

  receivePlayerCount() {
    console.log('***Enter receivePlayerCount');
    const self = this;
    Swal.fire({
      text: 'How Many Players?',
      input: 'radio',
      inputOptions: {
        1: 'One',
        2: 'Two',
        3: 'Three',
        4: 'Four'
      },
      showCancelButton: true,
    }).then(function (inputValue) {
      if (inputValue) {
        self.gatherPlayers(Number(inputValue.value));
      }
    });
  }

  gatherPlayers(numPlayers) {
    console.log('***Enter gatherPlayers');
    const optionMap = this.availablePlayers.map(a => a.firstName);
    const questions = [];
    for (let _i = 1; _i <= numPlayers; _i++) {
      const pnum = _i + 1;
      questions.push({text: 'Select Player ' + _i + ' from available players'});
    }
    Swal.mixin({
           input: 'select',
           inputOptions: this.availablePlayers.map(a => a.firstName),
           showCancelButton: true,
                    }).queue(questions).then((result) => {
                                          if (result.value) {
                                            const chosenPlayers = this.dataService.getPlayerNamesByIds(result.value);
                    const playerz = JSON.stringify(chosenPlayers);
                                            this.getPlayerList(chosenPlayers);
                     }
  });
    // this.gameStarted = true;
    // this.setOrder();
    // this.startNewRound();
}

  start() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Here we go',
      text: 'Select players?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: ' Add Players ',
      cancelButtonText: ' Quick Start ',
      reverseButtons: false
    }).then((result) => {
      if (result.value) {
        this.receivePlayerCount();
        this.quickStart = false;
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.enableQuickStart();
        this.gameStarted = true;
        this.setOrder();
        this.startNewRound();
      }
    });
  }

  enableQuickStartTeam() {
    console.log('***Enter enableQuickStartTeam');
    this.playerOne = new CricketPlayer('Gabe', 'Altenhofen', 1 );
    this.playerTwo = new CricketPlayer('Luke', 'Lorenz', 2);
     this.playerThree = new CricketPlayer('Paul', 'Loftis', 3, 2);
     this.playerFour = new CricketPlayer('Bryan', 'Swalley', 4, 2);
     this.homeTeam = new CricketTeam(1, 'The Donnybrooks', this.playerOne, this.playerTwo, true);
     this.awayTeam = new CricketTeam(2, 'Merica', this.playerThree, this.playerFour, false);
     this.teams = [this.awayTeam, this.homeTeam];

    this.awayTeamGame = new CricketTeamGame(this.awayTeam);
    this.homeTeamGame = new CricketTeamGame(this.homeTeam);
  }

  enableQuickStart() {
    console.log('***Enter enableQuickStart');
    this.quickStart = true;
    this.playerOne = new CricketPlayer('Gabe', 'Altenhofen', 1);
    this.playerTwo = new CricketPlayer('Craig', 'Freyman', 2);
    this.firstPlayerGame = new CricketGame(this.playerOne);
    this.secondPlayerGame = new CricketGame(this.playerTwo);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: 'Select Game Type',
      text: 'Must go in order?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: ' Slop counts ',
      cancelButtonText: ' Go in order ',
      reverseButtons: false
    }).then((result) => {
      if (result.value) {
        this.inOrder = true;
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.inOrder = false;
      }
    });
  }
  setOrderTeam() {
    this.getPlayerListTeam(this.awayTeamGame, this.homeTeamGame);
    this.currentPlayer = this.playerList[this.playerIterator];
    this.currentPlayerId = this.playerIdList[this.playerIdIterator];
  }

  setOrder() {
    console.log('***Enter setOrder');
    if (this.quickStart === true) {
      this.setQuickstartPlayerList();
    }
    this.currentPlayer = this.playerList[this.playerIterator];
    this.currentPlayerId = this.playerIdList[this.playerIdIterator];
    console.log('currentPlayer', this.currentPlayer);
    console.log('currentPlayer', this.currentPlayerId);
    console.log('this.playerIdList', this.playerIdList);
  }

  startNewTeamRound() {
  this.currentTeamRound = new CricketRoundTeam(this.currentPlayer.playerId, this.currentPlayer.teamId);
  console.log('currentTeamRound: ', this.currentTeamRound);
  }

  startNewRound() {
    console.log('***Enter startNewRound');
    this.currentRound = new CricketRound(this.currentPlayer.playerId);
    console.log('currentRound: ', this.currentRound);
  }

  showSingle() {
    this.multiplier = 1;
    this.showSingles = true;
    this.showDoubles = false;
    this.showTriples = false;
  }

  toggleDouble() {
    if (this.showDoubles === true) {
      this.showSingle();
    } else {
      this.multiplier = 2;
      this.showSingles = false;
      this.showDoubles = true;
      this.showTriples = false;
    }
  }

  toggleTriple() {
    if (this.showTriples === true) {
      this.showSingle();
    } else {
      this.multiplier = 3;
      this.showSingles = false;
      this.showDoubles = false;
      this.showTriples = true;
    }
  }

  onNextPlayer() {
    if (this.playerIterator < (this.playerList.length - 1)) {
      this.playerIterator++;
      this.currentPlayer = this.playerList[this.playerIterator];
    }  else {
      this.playerIterator = 0;
      this.currentPlayer = this.playerList[this.playerIterator];
      this.roundNumber++;
    }
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      this.firstPlayerGame.rounds.push(this.currentRound);
    } else
      if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      this.secondPlayerGame.rounds.push(this.currentRound);
    }
    this.moreDarts = true;
    this.throwNum = 1;
    this.startNewRound();

    console.log('Player 1 Game: ', this.firstPlayerGame);
    console.log('Player 2 Game: ', this.secondPlayerGame);
  }

  /*onNextTeamPlayer() {
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
    this.startNewTeamRound();
  }

  onPrevTeamPlayer() {
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
}*/

  undoThrow() {}
  undoTurn() {}

/* onHit(number, multiplier) {
    if (this.currentRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.throwNum <= 3) {
        switch (number) {
          case 20:
            console.log('You hit the 20 (times ' + number + ')');
          for
            (let
            i = 0;
            i < multiplier;
            i++
          )
          {
            this.awayTeamGame.twenties++;
          }
            if (this.awayTeamGame.twenties > 2) {
              console.log('You closed the twenties');
            }
            break;
        }
        this.processThrow();

      }
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
  } */

/*  processThrows() {
    this.throwNum++;
    if (this.throwNum < 4 ) {
    }  else {
      this.moreDarts = false;
    }
    this.showSingle();
  }*/

  onHit20(multiplier) {
    const hit = new CricketHit(20, multiplier);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.currentRound.darts.length < 3 && this.firstPlayerGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.twenties++;
        }
        this.currentRound.darts.push(hit);

        if (this.firstPlayerGame.twenties > 2) {
          this.firstPlayerGame.twentyClosed = true;
        }
      }
      this.processThrow();  // kill this

    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.currentRound.darts.length <= 3 && this.secondPlayerGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.twenties++;
        }
        this.currentRound.darts.push(hit);
        if (this.secondPlayerGame.twenties > 2) {
          this.secondPlayerGame.twentyClosed = true;
        }
      }
      this.processThrow(); // kill this

    }
  }
  onHit19(multiplier) {
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.nineteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.nineteens++;

          // this.addScore(20);
        }
        if (this.firstPlayerGame.nineteens > 2) {
          this.firstPlayerGame.nineteenClosed = true;
        }
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.nineteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.nineteens++;

         //  this.addScore(20);
        }
        if (this.secondPlayerGame.nineteens > 2) {
          this.secondPlayerGame.nineteenClosed = true;
        }
      }
      this.processThrow();
    }
  }

  onHit18(multiplier) {
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.eighteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.eighteens++;

     //     this.addScore(20);
        }
        if (this.firstPlayerGame.eighteens > 2) {
          this.firstPlayerGame.eighteenClosed = true;
        }
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.eighteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.eighteens++;

    //      this.addScore(20);
        }
        if (this.secondPlayerGame.eighteens > 2) {
          this.secondPlayerGame.eighteenClosed = true;
        }
     }
      this.processThrow();
    }
  }

  onHit17(multiplier) {
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.seventeenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.seventeens++;

         // this.addScore(20);
        }
        if (this.firstPlayerGame.seventeens > 2) {
          this.firstPlayerGame.seventeenClosed = true;
        }
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.seventeenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.seventeens++;

       //   this.addScore(20);
        }
        if (this.secondPlayerGame.seventeens > 2) {
          this.secondPlayerGame.seventeenClosed = true;
        }
      }
      this.processThrow();
    }
  }
  onHit16(multiplier) {
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.sixteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.sixteens++;

      //    this.addScore(20);
        }
        if (this.firstPlayerGame.sixteens > 2) {
          this.firstPlayerGame.sixteenClosed = true;
        }
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.sixteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.sixteens++;

      //    this.addScore(20);
        }
        if (this.secondPlayerGame.sixteens > 2) {
          this.secondPlayerGame.sixteenClosed = true;
        }
      }
      this.processThrow();
    }
  }
  onHit15(multiplier) {
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.fifteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.fifteens++;

          //  this.addScore(20);
        }
        if (this.firstPlayerGame.fifteens > 2) {
          this.firstPlayerGame.fifteenClosed = true;
        }
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.fifteenClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.fifteens++;

          //  this.addScore(20);
        }
        if (this.secondPlayerGame.fifteens > 2) {
          this.secondPlayerGame.fifteenClosed = true;
        }
        this.processThrow();
      }
    }
  }
  onHitBullseye(multiplier) {
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.firstPlayerGame.bullseyeClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.firstPlayerGame.bullseyes++;

      //    this.addScore(20);
        }
        if (this.firstPlayerGame.bullseyes > 2) {
          this.firstPlayerGame.bullseyeClosed = true;
        }
      }
      this.processThrow();
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.throwNum <= 3 && this.secondPlayerGame.bullseyeClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.secondPlayerGame.bullseyes++;

      //    this.addScore(20);
        }
        if (this.secondPlayerGame.bullseyes > 2) {
          this.secondPlayerGame.bullseyeClosed = true;
        }
      }
      this.processThrow();
    }
  }
  onMiss()  {
    const hit = new CricketHit(0, 0);
    if (this.currentRound.playerId === this.firstPlayerGame.player.playerId) {
      if (this.currentRound.darts.length < 3) {
        this.currentRound.darts.push(hit);
      }
      this.processThrow();
      console.log('You suck.');
    } else if (this.currentRound.playerId === this.secondPlayerGame.player.playerId) {
      if (this.currentRound.darts.length < 3) {
        this.currentRound.darts.push(hit);
      }
      this.processThrow();
      console.log('You suck.');
    }

    console.log('onMiss currentRound: ', this.currentRound);
  }
/*
  onTeamHit20(multiplier) {
    const hit = new CricketHit(20, multiplier);
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.currentRound.darts.length < 3 && this.awayTeamGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.awayTeamGame.twenties++;
        }
        this.currentRound.darts.push(hit);

        if (this.awayTeamGame.twenties > 2) {
          this.awayTeamGame.twentyClosed = true;
        }
      }
      this.processThrow();  // kill this
      console.log('Away Team twenties: ', this.awayTeamGame.twenties);
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.currentRound.darts.length <= 3 && this.homeTeamGame.twentyClosed === false) {
        for (let i = 0; i < multiplier; i++) {
          this.homeTeamGame.twenties++;
        }
        this.currentRound.darts.push(hit);
        if (this.homeTeamGame.twenties > 2) {
          this.homeTeamGame.twentyClosed = true;
        }
      }
      this.processThrow(); // kill this
      console.log('onHit20 twenties: ', this.homeTeamGame.twenties);
    }

    console.log('onHit20 currentRound: ', this.currentRound);

  }
  onTeamHit19(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
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
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
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

  onTeamHit18(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
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
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
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

  onTeamHit17(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
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
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
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
  onTeamHit16(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
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
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
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
  onTeamHit15(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
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
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
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
  onTeamHitBullseye(multiplier) {
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
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
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
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
  onTeamMiss()  {
    const hit = new CricketHit(0, 0);
    if (this.currentTeamRound.teamId === this.awayTeamGame.team.teamId) {
      if (this.currentRound.darts.length < 3) {
        this.currentRound.darts.push(hit);
        }
      this.processThrows();
      console.log('You suck.');
    } else if (this.currentTeamRound.teamId === this.homeTeamGame.team.teamId) {
      if (this.currentRound.darts.length < 3) {
        this.currentRound.darts.push(hit);
      }
      this.processThrows();
      console.log('You suck.');
    }

    console.log('onMiss currentRound: ', this.currentRound);
  }*/

  processThrow() {
    this.throwNum++;
    if (this.throwNum < 4 ) {
    }  else {
      console.log('Round Finished.  Check for BiB');
      console.log('this.currentRound: ', this.currentRound);
      if (this.currentRound.darts.filter(d => d.target > 0 ).length === 3 ) {
        this.currentRound.bib = true;
        console.log('BIB MOTHERFUCKER');
      }
      this.moreDarts = false;
    }

    this.showSingle();
  }

  addScore(num)  {
console.log('You got ' + num + ' points.');
  }

}
