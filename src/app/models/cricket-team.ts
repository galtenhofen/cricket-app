
export class CricketTeam {
  teamId: number;
  teamName: string;
  playerId1: number;
  playerId2: number;

  constructor(teamId, teamName, player1, player2){
    this.teamId = teamId;
    this.teamName = teamName;
    this.playerId1 = player1;
    this.playerId2 = player2;
  }
}

