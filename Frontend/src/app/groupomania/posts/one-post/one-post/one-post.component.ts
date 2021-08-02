import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../services/posts.service';
import { Post } from '../../../models/Posts.model';
import { Like } from '../../../models/Likes.model';
import { Comment } from '../../../models/Comments.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { LikeService } from 'src/app/services/like.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Location } from '@angular/common';
import { User } from 'src/app/groupomania/models/Users.model';
//FONTAWESOME ICONS//
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
@Component({
	selector: 'app-one-post',
	templateUrl: './one-post.component.html',
	styleUrls: ['./one-post.component.css']
})
export class OnePostComponent implements OnInit {
	faThumbsUp = faThumbsUp;
	faThumbsDown = faThumbsDown;
	faTrash = faTrashAlt;
	faEdit = faEdit;

	post: Post[];
	comments: Comment[];
	likes: Like[] = [];
	userId: string;
	id: string;
	postId: string;
	commentForm: FormGroup;
	user: User;


	constructor (
		private postsService: PostsService,
		private authService: AuthService,
		private likeService: LikeService,
		private commentService: CommentService,
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private location: Location ) 
		{ this.user = new User() }

	ngOnInit() {
		this.getOnePost();
		this.getLikes();
		this.initForm();
		this.getComments();
		this.postId = this.route.snapshot.paramMap.get('id');
		this.userId = this.authService.getUserId();
	}

	getOnePost() {
		this.route.params.forEach((params) => {
			this.postsService.getPostById(params.id)
				.subscribe((post) => {
					this.post = post
					this.getLikes();
				})
		})
	}

	onDeletePost(post) {
		this.postsService.deletePost(post.id).subscribe(() => {
			Swal.fire(
				'Supprimé!',
				'Post Supprimé !',
				'warning'
			)
			this.location.back()
		})
	}

	// LIKES DISLIKES //
	// likeDislike(publicationLike) {
	//   this.likeService.likePost(publicationLike)
	//     .subscribe(() => {
	//       this.getOnePost();
	//     });
	// }

	onLikePost(post) {
		const publicationLike = {
			postId: post.id,
			likes: 1,
			userId: this.authService.getUserId()
		};

		// this.likeDislike(publicationLike)
		this.likeService.likePost(publicationLike, this.postId)
			.subscribe(() => {
				this.getLikes();
			});
	}

	onDislikePost(post) {
		const publicationLike = {
			postId: post.id,
			likes: -1,
		};
		this.likeService.likePost(publicationLike, this.postId)
			.subscribe(() => {
				this.getLikes();
			});
	}
	getLikes() {
		this.likeService.getLikes(this.postId).subscribe({
			next: like => this.likes = like,
			error: error => console.error(error)
		})
	}

	// COMMENTS //
	initForm() {
		this.commentForm = this.formBuilder.group({
			textComment: ['', Validators.required],
		});
	}

	submitComment(event, post) {
		if (event.keyCode === 13) {
			const textComment = this.commentForm.get('textComment').value;
			this.commentService.newComment(textComment, post.id).subscribe(() => {
				this.commentForm.reset()
				this.getComments()
			})
		}
	}

	getComments() {
		this.route.params.forEach((params) => {
			this.commentService.getComments(params.id)
				.subscribe((comment) => {
					this.comments = comment
					this.getOnePost()
				})
		})
	}

}
