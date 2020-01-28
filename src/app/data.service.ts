import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  players = [
    {id: 1, teamId: 1, firstName: 'Gabe', lastName: 'Altenhofen', email: 'heyitsgabe@hotmail.com'},
    {id: 2, teamId: 0, firstName: 'Shezza', lastName: 'Altenhofen', email: 'shezzafromnz@yahoo.co.uk'},
    {id: 3, teamId: 1, firstName: 'Luke', lastName: 'Lorenz', email: 'luke.jlorenz@gmail.com'},
    {id: 4, teamId: 2, firstName: 'Paul', lastName: 'Loftis', email: 'ploftis2000@yahoo.com'},
    {id: 5, teamId: 2, firstName: 'Bryan', lastName: 'Swalley', email: 'bryanswalley@yahoo.com'},
    {id: 6, teamId: 3, firstName: 'Lee', lastName: 'McKitrick', email: 'dleewv@yahoo.com'},
    {id: 7, teamId: 3, firstName: 'Corey', lastName: 'McKitrick', email: 'cory.mckitrick@gmail.com'},
    {id: 8, teamId: 4, firstName: 'Lance', lastName: 'McElhinney', email: 'linneymc@yahoo.com'},
    {id: 9, teamId: 4, firstName: 'Greg', lastName: 'Zettler', email: 'grzettler@gmail.com'},
    {id: 10, teamId: 5, firstName: 'RJ', lastName: 'Miller', email: 'arejaymils@gmail.com'},
    {id: 11, teamId: 5, firstName: 'Cole', lastName: 'Duke', email: 'cgdjlbbcd@gmail.com'}]


  constructor() { }

  public getPlayers(): Array<{id, teamId, firstName, lastName, email}> {
    return this.players;
  }
  public addPlayer(player: {id, teamId, firstName, lastName, email}) {
    this.players.push(player);
  }
}
