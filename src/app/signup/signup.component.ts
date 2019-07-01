import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {User} from '../user';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class RegisterComponent implements OnInit {
  data = false;
  UserForm: any;
  massage: string;
  constructor(private formbulider: FormBuilder, private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.UserForm = this.formbulider.group({
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password1: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      birth_date: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      year_of_experience: ['', [Validators.required]],
      preferred_language: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }



  onFormSubmit() {
    const user = this.UserForm.value;
    this.Createemployee(user);

  }

  Createemployee(register: User) {
    this.loginService.CreateUser(register).subscribe(
      () => {
        this.data = true;
        this.massage = 'Data saved Successfully';
        this.UserForm.reset();
        this.router.navigate(['login']);
      },err => {
      alert(err);
    });
  }
}
