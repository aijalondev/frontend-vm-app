import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:2803/user';

  constructor(private authService: AuthService, private http: HttpClient) { }

  getUserById(userId: number): Observable<any> {
    const headers = this.authService.createHeader();
    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers });
  }

  getUsers(page: number, size: number, name: string): Observable<any> {
    const headers = this.authService.createHeader();

    let params = new HttpParams()

    if (name) {
      params = params.set('name', name);
    } else {
      params = params.set('page', page.toString());
      params = params.set('size', size.toString());
    }
    return this.http.get<any>(`${this.apiUrl}`, { headers, params });
  }

  register(email: string, password: string, name: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { email, password, name, role });
  }

  updateUser(userId: number, userData: any): Observable<any> {
    const headers = this.authService.createHeader();
    return this.http.put(`${this.apiUrl}/${userId}`, userData, { headers });
  }

  deleteUser(userId: number): Observable<any> {
    const headers = this.authService.createHeader();
    return this.http.delete(`${this.apiUrl}/${userId}`, { headers });
  }
}