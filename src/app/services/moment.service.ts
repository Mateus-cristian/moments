import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMoment } from '../interfaces/Moment';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/Response';

@Injectable({
  providedIn: 'root',
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  getMoments(): Observable<IResponse<IMoment[]>> {
    return this.http.get<IResponse<IMoment[]>>(this.apiUrl);
  }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl, formData);
  }

  getMoment(id: number): Observable<IResponse<IMoment>> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<IResponse<IMoment>>(url);
  }

  removeMoment(id: number) {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<IResponse<IMoment>>(url);
  }

  updateMoment(id: number, formData: FormData): Observable<FormData> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<FormData>(url, formData);
  }
}
