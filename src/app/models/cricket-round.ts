export class CricketRound {
  playerId: number;
  teamId: number;
  dart1: number;
  dart2: number;
  dart3: number;
  bib: boolean;

  constructor(playerId , teamId) {
    this.playerId = playerId;
    this.teamId = teamId;
    this.dart1 = null;
    this.dart2 = null;
    this.dart3 = null;
    this.bib = false;
  }
}
