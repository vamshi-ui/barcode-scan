import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from './appointment.model';
import { OperationResponse } from './response.model';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl: string = '';

  constructor(private http: HttpClient) {
  }

  public logAppointment(appointment: Appointment): Observable<OperationResponse> {
    console.log(appointment);
    return this.http.post<OperationResponse>(this.baseUrl, appointment);
  }

}