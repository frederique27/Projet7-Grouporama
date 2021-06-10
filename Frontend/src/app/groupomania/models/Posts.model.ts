// export class Post {
//     // textPost: string;
//     photo: string;
//     constructor(public textPost: string) {
//     }
//   }

export class Post {
  constructor(
    public textPost: string,
    public photo: string,
    public id: number,
    public userId: string,
    public likes: number,
    // public dislikes: number,
    ) {
  }
}