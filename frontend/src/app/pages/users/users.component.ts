import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  users: Array<any>;
  message: string;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.user.all().subscribe({
      next: data => {
        this.users = data.users;
        this.users.forEach(user => {
          if(user.last_login == null){
            user.last_login = "El usuario no ha iniciado sesión"
          }
          else {
            user.last_login = moment(user.last_login).format('MM/DD/YYYY h:mm');
          }         
        });
      },
      error: error => {
        var error = JSON.parse(error.error)
        this.message = error.message;      
      }
    });
  }

}
