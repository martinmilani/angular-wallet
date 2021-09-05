import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  apiUrl = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

  constructor(private http: HttpClient) {}

  getPrices(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
