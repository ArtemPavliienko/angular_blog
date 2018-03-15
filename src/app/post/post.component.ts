import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { LoginFormComponent } from '../login-form/login-form.component';

import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  newTitlePost: string;
  newTextPost: string;
  posts;
  more: Array = [1,2,3];

  constructor(private user: UserService, public userLog: LoginFormComponent) {
    // получаем все посты в объекте
    this.posts = JSON.parse(localStorage.getItem('Posts'));

    console.log(this.posts);
    console.log(this.posts.user);
    // console.log(userLog, 'userLog');
    // console.log(userLog.userLog);
    // console.log(userLog.userNameLog());
  }

  ngOnInit() {
    this.viewPosts();
  }

  viewPosts() {

  }

  addPostModal() {
    // берем модал и добавляем класс опен
      let modal = $('#addPost-modal');
      modal.toggleClass('open');

      // затемняем боди
      let body = $('body');
      body.toggleClass('darkened');
  }

  addPost(event, newTitlePost, newTextPost) {
      event.preventDefault();

      if (this.posts === null) {
        // если нет
        this.posts = [];

        let time = new Date();
        let timePost = `${time.getHours()}:${time.getMinutes()} / ${time.getDay()}.${time.getMonth()}.${time.getFullYear()}`;

        let id = 1;

        this.localSt(newTitlePost, newTextPost, timePost, id);
      } else {
        // если есть
        let time = new Date();
        let timePost = `${time.getHours()}:${time.getMinutes()} / ${time.getDay()}.${time.getMonth()}.${time.getFullYear()}`;

        let id;

        // послеждний goods[goods.length - 1];
        // берем первый эл массива
        let lastPost = this.posts[0];
        id = lastPost.id++;

        this.localSt(newTitlePost, newTextPost, timePost, id);
      }
  }

  localSt(titl, text, timePost, id) {
      let newP = {
          user: 'user',
          titlePost: titl,
          textPost: text,
          time: timePost,
          id: id
      }

      this.posts.push(newP);
      var json = JSON.stringify(this.posts); //сериализуем его
      localStorage.setItem("Posts", json);
  }

  delPost() {

  }

}
