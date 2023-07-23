import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {User} from '../../models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent {
  public status: string = '';

  constructor(private _userService: UserService) {}
  public page_title = 'Registrate';
  public user = new User(1,'','','ROLE_USER','','','','');

  ngOnInit(){
    console.log(this._userService.test());

  }


  onSubmit(form: NgForm){

    this._userService.register(this.user).subscribe(
      response => {

      if(response.status == 'success'){
        this.status = response.status;
        form.reset();
        
      }else{
        this.status = 'error';
      }


      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );

  }
}
