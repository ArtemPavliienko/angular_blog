import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  newTitlePost: string;
  newTextPost: string;
  posts;
  thisUserName: string;

  constructor(private user: UserService) {
    // получаем все посты в объекте
    this.posts = JSON.parse(localStorage.getItem('Posts'));
    // name user
    this.thisUserName = this.user.userName;
    console.log(this.thisUserName, 'this.userY')
  }

  ngOnInit() {}

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
        let timePost = `${time.getHours()}:${time.getMinutes()}  ${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`;

        let id = 1;

        this.localSt(newTitlePost, newTextPost, timePost, id);
      } else {
        // если есть
        let time = new Date();
        let timePost = `${time.getHours()}:${time.getMinutes()}  ${time.getDate()}.${time.getMonth()}.${time.getFullYear()}`;

        let id;

        // послеждний goods[goods.length - 1];
        // берем первый эл массива
        let lastPost = this.posts[this.posts.length -1];
        id = lastPost.id++;

        this.localSt(newTitlePost, newTextPost, timePost, id);
      }
  }

  localSt(titl, text, timePost, id) {
      let newP = {
          user: this.thisUserName,
          titlePost: titl,
          textPost: text,
          time: timePost,
          id: id
      }

      this.posts.unshift(newP);
      let json = JSON.stringify(this.posts); //сериализуем его
      localStorage.setItem("Posts", json);
  }

  delPost() {

  }

}
