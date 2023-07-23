import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {User} from '../../models/user';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent {
  public status: string = '';
  public token: any;
  public identity: any;

  public page_title = 'identificate';
  public user = new User(1,'','','ROLE_USER','','','','');

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
    ) {}


    ngOnInit(){
      // se ejecutra siempre y cierra sesion solo cuando le llega el paramatero sure por la url
   this.logout(); 
    }

  onSubmit(form: NgForm){ 
    this._userService.signup(this.user).subscribe(
      response => {
        // token
        if(response.status != 'error'){
          this.status= 'success';
          this.token = response;

          // objeto del usuario identificado 
          this._userService.signup(this.user, true).subscribe(
            response => {
              // token
             
                this.identity = response;
                console.log(this.token);
                console.log(this.identity);
      
                localStorage.setItem('token', this.token);
                localStorage.setItem('identity',JSON.stringify(this.identity));

                        // redireccion al inicio
        this._router.navigate(['inicio']);
    
            },
            error => {
              this.status = 'error';
              console.log(<any>error);
            }
          )
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

    logout(){
   this._route.params.subscribe((params) => {
      let logout = +params['sure'];
      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        // redireccion al inicio
        this._router.navigate(['inicio']);

      }
    })
   } 
 

}



