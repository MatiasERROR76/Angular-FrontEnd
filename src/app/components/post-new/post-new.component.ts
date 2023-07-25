import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/models/post';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { AngularFileUploaderConfig } from 'angular-file-uploader';
import { global } from 'src/app/services/global';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]

})
export class PostNewComponent implements OnInit {
  public page_title: string = '';
  public identity: any;
  public token: any;
  public post: Post;
  public categories: any;
  public status: any;

  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat','alert'],
  };

  public afuConfig : AngularFileUploaderConfig  = {
    multiple: false,
    formatsAllowed: ".jpg,.png, gif, .jpeg",
    maxSize: 50,
    uploadAPI:  {
      url:global.url+'post/upload',
      method:"POST", // Change this from string to "POST"
      headers: {
        "Authorization": this._userService.getToken()
      },
      params: {
        page: '1',
      },
      responseType: 'json',
    },
    
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu avatar de usuario',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };




constructor(
  private _route: ActivatedRoute,
  private _router: Router,
  private _userService: UserService,
  private _categoryService: CategoryService,
  private _postService: PostService

){
  this.page_title = 'Crear una entrada';
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  this.post = new Post(1, this.identity.sub, 1,'', '', '', null);
} 


ngOnInit() {
this.getCategories();
  
console.log(this.post);


}

getCategories(){
  this._categoryService.getCategories().subscribe(
    response => {
      if(response.status == 'success'){
        this.categories = response.categories;
        console.log(this.categories);
      }
    },
    error => {
      console.log(error);
    }
  );
}

imageUpload(datos:any){
    
  let d = JSON.stringify((datos.body));
  let image_data = JSON.parse(d);
  this.post.image = image_data.image;
  // muestra el cuerpo de la respuesta

}

onSubmit(form: NgForm){

  this._postService.create(this.token, this.post).subscribe(
    response => {
      if(response.status == 'success'){
        this.post = response.post;
        this.status = 'success';
        this._router.navigate(['/inicio']);
      }else{
      this.status = 'error';

      }
    }, 
    error => {
      console.log(error);
      this.status = 'error';

    }

  );
  
}



}
