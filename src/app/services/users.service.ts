import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { USERS_ENDPOINT, environment } from '../../env';
import { RestService } from './rest.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  token: string;

  constructor(private http: HttpClient, private restService: RestService) {}

  urlApi: string = environment.apiUrl;
  registerRoute: string = `${USERS_ENDPOINT.users}${USERS_ENDPOINT.register}`;
  loginRoute: string = `${USERS_ENDPOINT.users}${USERS_ENDPOINT.login}`;
  profileRoute: string = `${USERS_ENDPOINT.users}${USERS_ENDPOINT.profile}`;
  checkUsernameRoute: string = `${USERS_ENDPOINT.users}`;
  authRoute: string = `${USERS_ENDPOINT.users}${USERS_ENDPOINT.auth}`

  register(user): Observable<any>{
    return this.http.post(`${this.urlApi}${this.registerRoute}`,user);
  }

  
  login(user): Observable<any>{
    return this.http.post(`${this.urlApi}${this.loginRoute}`,user);
  }

  async checkUsername(username: string): Promise<any>{
    const query = `?username=${username}`
    const url: string = this.urlApi.concat(this.checkUsernameRoute);
    const path: string = url.concat(query);
    console.log(path)
    return await this.restService.get(`${path}`)
  }

  getToken(){
    this.token = localStorage.getItem('AUTH_TOKEN');
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });
    return headers;
  }

  async getProfile(username): Promise<any>{
    const headers = this.getToken();
    return await this.restService.get(`${this.urlApi}${this.profileRoute}${username}`, headers);
  }

  async isAuth(): Promise<boolean>{
    const headers = this.getToken();
    return await this.restService.get(`${this.urlApi}${this.authRoute}`, headers);
  }

}
