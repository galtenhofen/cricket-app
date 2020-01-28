import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  players ;
  selectedPlayer;
  constructor(public dataService: DataService) { }

  ngOnInit() {
    this.players = this.dataService.getPlayers();
  }
  public selectPlayer(players) {
    this.selectedPlayer = players;
  }

}
