import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    private isUserLoggedIn;
    private userName;

  constructor() {
    this.isUserLoggedIn = false;
  }

    setUserLoggedIn() {
        this.isUserLoggedIn = true;
    }

    getUserLoggedIn() {
        return this.isUserLoggedIn;
    }

}
