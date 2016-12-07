import { Injectable } from '@angular/core';

@Injectable()
export class PlayerStatsService {

  playerStats={
    name: null,
    score: null,
    total: null
  }

  constructor() { }

}
