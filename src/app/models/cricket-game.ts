import {CricketRound} from './cricket-round';

export class CricketGame {
  rounds: CricketRound[];
  bibs: number;
  twentyClosed: boolean;
  nineteenClosed: boolean;
  eighteenClosed: boolean;
  seventeenClosed: boolean;
  sixteenClosed: boolean;
  fifteenClosed: boolean;
  bullseyeClosed: boolean;
  isActive: boolean;
  isWinner: boolean;

  constructor() {
    this.rounds = [];
    this.twentyClosed = false;
    this.nineteenClosed = false;
    this.eighteenClosed = false;
    this.seventeenClosed = false;
    this.sixteenClosed = false;
    this.fifteenClosed = false;
    this.bullseyeClosed = false;
    this.bibs = 0;
    this.isActive = false;
    this.isWinner = false;
  }
}

