import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  players = [
    {playerId: 1, teamId: 1, firstName: 'Gabe', lastName: 'Altenhofen', email: 'heyitsgabe@hotmail.com'},
    {playerId: 2, teamId: 0, firstName: 'Shezza', lastName: 'Altenhofen', email: 'shezzafromnz@yahoo.co.uk'},
    {playerId: 3, teamId: 1, firstName: 'Luke', lastName: 'Lorenz', email: 'luke.jlorenz@gmail.com'},
    {playerId: 4, teamId: 0, firstName: 'Craig', lastName: 'Freyman', email: 'craigfreyman@gmail.com'},
    {playerId: 5, teamId: 2, firstName: 'Paul', lastName: 'Loftis', email: 'ploftis2000@yahoo.com'},
    {playerId: 6, teamId: 2, firstName: 'Bryan', lastName: 'Swalley', email: 'bryanswalley@yahoo.com'},
    {playerId: 7, teamId: 3, firstName: 'Lee', lastName: 'McKitrick', email: 'dleewv@yahoo.com'},
    {playerId: 8, teamId: 3, firstName: 'Corey', lastName: 'McKitrick', email: 'cory.mckitrick@gmail.com'},
    {playerId: 9, teamId: 4, firstName: 'Lance', lastName: 'McElhinney', email: 'linneymc@yahoo.com'},
    {playerId: 10, teamId: 4, firstName: 'Greg', lastName: 'Zettler', email: 'grzettler@gmail.com'},
    {playerId: 11, teamId: 5, firstName: 'RJ', lastName: 'Miller', email: 'arejaymils@gmail.com'},
    {playerId: 12, teamId: 5, firstName: 'Cole', lastName: 'Duke', email: 'cgdjlbbcd@gmail.com'}    ];

  teams = [{teamId: 1, teamName: 'The Donnybrooks', playerId1: 1, playerId2: 2},
  {teamId: 2, teamName: 'Merica', playerId1: 4, playerId2: 5},
  {teamId: 3, teamName: 'Mounties', playerId1: 6, playerId2: 7},
  {teamId: 4, teamName: 'Bumblebees', playerId1: 10, playerId2: 11},
    {teamId: 5, teamName: 'Alan Evans', playerId1: 8, playerId2: 9}];


  constructor() { }

  public getPlayers(): Array<{playerId, teamId, firstName, lastName, email}> {
    return this.players;
  }
  public getPlayerNamesByIds(playerIds): Array<{playerId, teamId, firstName, lastName, email}> {
    const result = this.players.filter(function(e) {
      console.log('e.playerId', e.playerId - 1);
      return playerIds.indexOf((e.playerId - 1).toString()) >= 0;
    });
    return result;
  }
  public getTeams(): Array<{teamId, teamName, playerId1, playerId2}> {
    return this.teams;
  }
  public addPlayer(player: {playerId, teamId, firstName, lastName, email}) {
    this.players.push(player);
  }
  //getPlayerById(playId){return player}
  //getTeamById(teamId){return team}
  //getPlayersByTeamId(teamId){return players}
}
