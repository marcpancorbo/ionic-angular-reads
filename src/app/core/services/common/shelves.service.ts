import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShelvesService {
  constructor(private readonly http: HttpClient) {}

  getShelves(): Observable<any> {
    return this.http.get(`${environment.books_api}/mylibrary/bookshelves`);
  }
}
