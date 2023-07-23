import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService]

})
export class PostNewComponent implements OnInit {
  public page_title: string = '';
  public identity: any;
  public token: any;
  public post: Post;

constructor(
  private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
  private _categoryService: CategoryService

){
  this.page_title = 'Crear una entrada';
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  this.post = new Post(1, this.identity.sub, 1,'', '', '', null);
} 


ngOnInit() {
  
console.log(this.post);
}



onSubmit(form: NgForm){


  
}




}
