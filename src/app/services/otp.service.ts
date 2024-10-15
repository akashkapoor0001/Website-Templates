import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private http: HttpClient) {}

  sendOtp(phoneNumber: string): Observable<any> {
    return this.http.post('/api/sendOtp', { phoneNumber });
  }

  verifyOtp(phoneNumber: string, otp: string): Observable<any> {
    return this.http.post('/api/verifyOtp', { phoneNumber, otp });
  }
}
