import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn;
  public userName;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn() {
      this.isUserLoggedIn = true;
  }

  getUserLoggedIn() {
      return this.isUserLoggedIn;
  }

  saveName(name) {
    this.userName = name;
  }

}
