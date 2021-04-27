import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Post } from '../models/post.model';
import firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class PostsService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts')
      .on('value', (data: DataSnapshot) => {
          this.posts = data.val() ? data.val() : [];
          this.emitPosts();
      });
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  // uploadFile(file: File) {
  //   return new Promise(
  //     (resolve, reject) => {
  //       const almostUniqueFileName = Date.now().toString();
  //       const upload = firebase.storage().ref()
  //         .child('images/' + almostUniqueFileName + file.name).put(file);
  //       upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //         () => {
  //           console.log('Chargement…');
  //         },
  //         (error) => {
  //           console.log('Erreur de chargement ! : ' + error);
  //           reject();
  //         },
  //         () => {
  //           resolve(upload.snapshot.ref.getDownloadURL());
  //         }
  //       );
  //     }
  //   );
  // }
}