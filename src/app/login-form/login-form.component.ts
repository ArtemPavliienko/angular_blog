import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  locSt: any;

  constructor(private router: Router, private user: UserService) {}

  ngOnInit() {}

  loginUser(event) {
      event.preventDefault();

      let userName = event.target.form.elements[0].value,
          userPass = event.target.form.elements[1].value;

      let localS = JSON.parse(localStorage.getItem('user'));

      let offOn = 0;
      // есть ли вообще зарегистрированые пользователи
      if (localS != null) {
          for (let i = 0; i < localS.length; i++) {
              if (userName === localS[i].userName && userPass === localS[i].userPass) {
                  offOn++;
              }
          }
      }

      if (offOn >= 1) {
        this.user.setUserLoggedIn();
        this.router.navigate(['/post']);
      } else if (offOn == 0) {
        alert('Error name or password');
      }
      this.user.saveName(userName);
  }

  registration(event) {
      event.preventDefault();

        let newUserName = event.target.form.elements[0].value,
            newUserPass = event.target.form.elements[1].value;

      if (newUserName === null || newUserName === '' &&
          newUserPass === null || newUserPass === '') {
          alert('Не введен логин или пароль.');
      } else {

          // берем значения с локал и сразу преобразуем
          // array => object
          let meaningsLocalS = JSON.parse(localStorage.getItem('user'));
          console.log(meaningsLocalS, 'только взяли 1');

          if (meaningsLocalS === null) {
              meaningsLocalS = [];
              this.ls(meaningsLocalS, newUserName, newUserPass);
          } else {
              let offOn = 0;
              for (let i = 0; i < meaningsLocalS.length; i++) {
                  if (newUserName === meaningsLocalS[i].userName) {
                      offOn++;
                      break;
                  }
              }

              if (offOn >= 1) {
                  alert('Пользователь с таким логином существует.');
              } else {
                  this.ls(meaningsLocalS, newUserName, newUserPass);
              }
          }

          this.user.saveName(newUserName);
      }
  }

  ls(meaningsLocalS, newUserName, newUserPass) {
      meaningsLocalS.push({userName: newUserName, userPass: newUserPass});
      console.log(meaningsLocalS, 'new user');

      let json = JSON.stringify(meaningsLocalS);
      localStorage.setItem('user', json);

      this.user.setUserLoggedIn();
      this.router.navigate(['/post']);
  }

}
