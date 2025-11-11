import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlatformAccount, CreateAccountRequest, GetPlatformAccountsRequest, CreateAccountResponse } from '../models/platform-account.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordManagerService {
  private baseUrl = 'http://localhost:5678';

  constructor(private http: HttpClient) { }

  createAccount(request: CreateAccountRequest): Observable<CreateAccountResponse> {
    return this.http.post<CreateAccountResponse>(`${this.baseUrl}/webhook/create`, request);
  }

  getPlatformAccounts(request: GetPlatformAccountsRequest): Observable<PlatformAccount[]> {
    return this.http.post<PlatformAccount[]>(`${this.baseUrl}/webhook/get-platform-accounts`, request);
  }

  getAllPlatforms(): Observable<string[]> {
    return this.http.get<{ uniquePlatforms: string[] }>(`${this.baseUrl}/webhook/get-all-platforms`).pipe(
      map(response => response.uniquePlatforms || [])
    );
  }
}
