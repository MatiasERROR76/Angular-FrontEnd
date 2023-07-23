import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';

import {Category} from '../../models/category';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-new',
  templateUrl: './category-new.component.html',
  styleUrls: ['./category-new.component.css'],
  providers: [UserService, CategoryService]

})
export class CategoryNewComponent {
  public page_title: string = '';
  public token: any;
  public identity: any;
  public category: Category;
  public status: string = '';



  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService


  ){
    this.page_title = 'Crear nueva categoria';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.category = new Category(1,'');
  };


  ngOnInit(){

  }

  onSubmit(form: NgForm){  
    this._categoryService.create(this.token, this.category).subscribe(
      response => {
        if(response.status == 'success'){
          this.category = response.category;
          this.status = 'success';
          this._router.navigate(['/inicio']);
          console.log(response.category);
          console.log(this.token);
          console.log(this.identity);

       }else{
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
        console.log(this.token);

      }
      
      );
      
  }




}
