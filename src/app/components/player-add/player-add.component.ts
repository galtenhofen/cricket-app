import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-add.component.html',
  styleUrls: ['./player-add.component.css']
})
export class PlayerAddComponent implements OnInit {

  player: {playerId, teamId, firstName, lastName, email} = {playerId: null, teamId: null, firstName: '', lastName: '', email: ''};
  constructor(public dataService: DataService) { }

  ngOnInit() {
  }
  addPlayer(){
    console.log(this.player);
    this.dataService.addPlayer(this.player);
    this.player = {playerId: null, teamId: null, firstName: '', lastName: '', email: ''};

  }
}
