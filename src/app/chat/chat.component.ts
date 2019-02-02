import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { PostService } from "../posts/post.service";
import * as io from 'socket.io-client';
@Component({
  // allows this component to be used
  selector: "app-chat",
  //uses html file
  templateUrl: "./chat.component.html"
})
export class ChatComponent implements OnInit {

  constructor (private postsService:PostService){}


  ngOnInit(){
    const socket=io("http://localhost:3000/");
    console.log(socket);
    socket.emit('input')
  }

  sendPost(chatForm:NgForm){
    const message=chatForm.value.textbox;
    this.postsService.sendMesssage(message);

  }

}
