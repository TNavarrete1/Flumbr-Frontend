import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PostRes } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';
import { TokenService } from 'src/app/services/tokenservice.service';
import { Vote } from 'src/app/models/post/vote';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent {
  @Input() post!: PostRes;
  isChatOpen = false;

  constructor(
    private postService: PostService,   
    private tokenService: TokenService,) {}

  navigateToTag(id: string) {
    console.log(id);
  }

  navigateToUser(id: string) {
    console.log(id);
  }

  likePost(id: string) {
    console.log("id is " + id);
    console.log("userId is " + this.tokenService.getUser().id);

    // The payload to be sent to the backend API
    const payload: Vote = {
      vote: true,
      postId: id,
      userId: this.tokenService.getUser().id,
    };

    // Call the post service to like the post.
    this.postService.likePost(payload).subscribe({
      next: (/* value */) => {
        //TODO: Call toaster service to msg?
        console.log("voted like for postId " + id );
      },
      error: (error) => {
        console.log("error in setting vote " + error);
      },
    });
    
  }

  dislikePost(id: string) {
    console.log("id  is " + id);

    // The payload to be sent to the backend API
    const payload: Vote = {
      vote: false,
      postId: id,
      userId: this.tokenService.getUser().id,
    };

    // Call the post service to like the post.
     this.postService.likePost(payload).subscribe({
      next: (/* value */) => {
        //TODO: Call toaster service to msg?
        console.log("voted dislike for postId " + id );
      },
      error: (error) => {
        console.log("error in setting vote " + error);
      },
    });

  }

  sharePost() {
    console.log('sharing');
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  reportPost(postId: string): void {
    // does this need to make a network request ?
  }
}
