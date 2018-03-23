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
  logInUserName: string;
  isAddPostModal = false;
  // isDarkened = false;

  car: number = 77;

  constructor(private user: UserService) {
    // получаем все посты в объекте
    this.posts = JSON.parse(localStorage.getItem('Posts'));
    // name user
    this.logInUserName = this.user.userName;
    console.log(this.logInUserName, 'this.userY')
  }

  ngOnInit() {}

  addPostModal(isAddPostModal) {
    // берем модал и добавляем класс опен
    this.isAddPostModal = !isAddPostModal;

    // затемняем боди
    // this.isDarkened = !isDarkened;

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
        if (id == undefined) id = 1;

        // послеждний goods[goods.length - 1];
        // берем первый эл массива
        if (this.posts.length != 0) {
          let lastPost = this.posts[this.posts.length -1];
          id = lastPost.id++;
        }

        this.localSt(newTitlePost, newTextPost, timePost, id);
      }
  }

  localSt(titl, text, timePost, id) {
      let newP = {
          user: this.logInUserName,
          titlePost: titl,
          textPost: text,
          time: timePost,
          id: id
      }

      this.posts.unshift(newP);
      let json = JSON.stringify(this.posts); //сериализуем его
      localStorage.setItem("Posts", json);
  }

  delPost(e, userPost, userPostId) {
    // пользователь удаляет свой пост или нет
    if (userPost == this.logInUserName) {
      // удаляем этот по ID
      for (let i = 0; i < this.posts.length; i++) {
        if (this.posts[i].user === userPost) {
          if (this.posts[i].id === userPostId) {
            this.posts.splice(i, 1);
            // break;
          }
        }
      }
      let json = JSON.stringify(this.posts); //сериализуем его
      localStorage.setItem("Posts", json);

    } else {
      console.log('не твой')
    }
  }

}
