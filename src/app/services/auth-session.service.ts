import { Injectable } from '@angular/core';


@Injectable()
export class AuthsessionService {

  isLogged: boolean;
  sessionData;

  constructor() { }

}