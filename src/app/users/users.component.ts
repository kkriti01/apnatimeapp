import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from "../user";
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  data: any;
  model: any={};
  users: User[];
  constructor(private api:LoginService, private router: Router) { }

  ngOnInit() {
    this.api.GetData().subscribe(data => this.data = data);
  }

    search(){
        this.api.SearchData(this.model).subscribe(data => this.data = data);

  };


  deleteUser(user){
    this.api.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.data.filter(u => u !== user);
      })
  };

  editUser(user){
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };
}
