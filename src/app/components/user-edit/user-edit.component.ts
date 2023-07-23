import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { global } from 'src/app/services/global';
import { AngularFileUploaderConfig } from 'angular-file-uploader';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {
  public page_title: string = '';
  public user: User;
  public token: any;
  public identity: any;
  public status: any;
  public url: any;
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
          url:global.url+'user/upload',
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

  constructor(private _userService: UserService){
    this.page_title = 'Ajustes de usuario';
    this.user = new User(1,'','','ROLE_USER','','','','');
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = global.url;
    this.user = new User
    (this.identity.sub,
    this.identity.name,
    this.identity.surname,
    this.identity.role,
    this.identity.email, '',
    this.identity.description,
    this.identity.image
    );


  }
  
  ngOnInit() {
    
  }

  onSubmit(form: NgForm){
    this._userService.update(this.token, this.user).subscribe(
      response => {
          if(response && response.status){
          console.log(response);
          console.log(this.identity);
  
            this.status = 'success';
            if(response && response.hasOwnProperty('change')){
              if(response.change && response.change.name){
                  this.user.name = response.change.name
              }
          
              if(response.change && response.change.surname){
                  this.user.surname = response.change.surname
              }
          
              if(response.change && response.change.email){
                  this.user.email = response.change.email
              }
          
              if(response.change && response.change.description){
                  this.user.description = response.change.description
              }
          
              if(response.change && response.change.image){
                  this.user.image = response.change.image
              }
              this.identity = this.user;
              localStorage.setItem('identity', JSON.stringify(this.identity));
          }
          
          
          }else{
            this.status = 'error';
          }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    )
  }


   avatarUpload(datos:any){
    
    let d = JSON.stringify((datos.body));
    let data = JSON.parse(d);
    this.user.image = data.image;
    // muestra el cuerpo de la respuesta
 
  }

  
}

