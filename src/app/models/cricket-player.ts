export class CricketPlayer {
  playerId: number;
  firstName: string;
  lastName: string;
  position: number;
  teamId?: string;
  bibs: number;
  wins: number;
  losses: number;

  constructor(firstName, lastName, position, team?) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.position = position;
    this.teamId = team;
    this.bibs = 0;
    this.wins = 0;
    this.losses = 0;
  }



}
