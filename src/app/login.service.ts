
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { User } from "../app/user";
import {isUndefined} from "util";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  Url :string;
  token : string;
  header : any;
  constructor(private http : HttpClient) {

    this.Url = 'http://localhost:8000';

    const headerSettings: {[name: string]: string | string[]; } = {};
    this.header = new HttpHeaders(headerSettings);
  }
  Login(model : any){
     var a =this.Url+"/api/token/";
   return this.http.post<any>(a,model,{ headers: this.header});
  }
   CreateUser(register:User)
   {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<User[]>(this.Url + '/api/v1/user/signup/', register, httpOptions)
   }
   GetData() {
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Token ' + sessionStorage.getItem('access') }) };
    return this.http.get<any[]>(this.Url+"/api/v1/users/", httpOptions);
  }

  SearchData(data) {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Token ' + sessionStorage.getItem('access') }) };
    return this.http.get<any[]>(this.Url+"/api/v1/users/?search="+data.search, httpOptions);

  }

  updateUser(user){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Token ' + sessionStorage.getItem('access') }) };

    return this.http.put<any[]>(this.Url+"/api/v1/users/"+ user.id+"/", user, httpOptions);
  }
  updateProfile(data){
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data', Authorization: 'Token ' + sessionStorage.getItem('access') }) };
    return this.http.patch<any[]>(this.Url+"/api/v1/users/"+ data.get('id')+"/", data, httpOptions);
  }
  getUserById(id: number){
    return this.http.get<any[]>(this.Url+"/api/v1/users/" + id+"/");
  }
  deleteUser(id){
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: 'Token ' + sessionStorage.getItem('access') }) };

    return this.http.delete<any[]>(this.Url+"/api/v1/users/" + id+"/", httpOptions);
  }
}
