import { Component, OnInit } from "@angular/core";
import { Post } from "../posts/post.model";
import { PostService } from "../posts/post.service";
import { Subscription } from "rxjs";
import {PageEvent} from '@angular/material';
@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit /*,OnDestroy*/ {

  totalPosts=10;
  postsPerPage=2;
  pageSizeOptions=[1,2,5,10];
  currentPage=1;
  isLoading=false;
  posts: Post[] = [];
  private postsSub: Subscription;
  //Injecting Post Service
  //postsService is the name, PostService is the type after importing it
  constructor(public postsService: PostService) {}
  ngOnInit() {
    //sending bad on the page on the html
    this.postsService.getPosts(this.postsPerPage,1);
    //listener to the subject...subscribes to the service, which has
    //arguments: next, error,complete
    this.isLoading=true;

    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postsData: {posts:Post[],postCount:number}) => {
        console.log('hefae');
        this.isLoading=false;
        //this.posts is the empty one... posts is the one that was from the main list of posts that just got updated
        this.posts = postsData.posts;
        this.totalPosts=postsData.postCount;
      });
  }

  //when switching pages, change the variables and send into post service...
  onChangedPage(pageData:PageEvent){
    //starts at 0...
    this.isLoading=true;
    this.currentPage=pageData.pageIndex+1;
    this.postsPerPage=pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  }
  onDelete(postId: string) {
    this.isLoading=true;

    this.postsService.deletePost(postId).subscribe(()=>
  {
    this.postsService.getPosts(this.postsPerPage,this.currentPage);
  });
  }

  /* ngOnDestroy(){
        this.postsSub.unsubscribe();
    } */
}
// Oninit allows us to use thfe service's methods
