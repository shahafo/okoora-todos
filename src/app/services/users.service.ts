import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { IUser } from '../models/user.model';

const URL = environment.api.base + environment.api.users;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http: HttpClient) { }

  getUser(username: string): Observable<IUser> {
    let query: HttpParams = new HttpParams().append("username", username);
    return this._http.get<IUser[]>(URL, { params: query }).pipe(
      map((data: IUser[]) => data[0])
    );
  }
}
