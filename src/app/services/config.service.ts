import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http: HttpClient) { }

  config: any;

  load() {
    return new Promise((resolve, reject) => {
      this.http.get(environment.configFile).subscribe((responseData: any) => {
        this.config = responseData;
        resolve(true);
      });
    });
  }

  public getValueFromConfig(key: any) {
    return this.config[key];
  }

  public getBaseUrl() {
    return this.config['baseUrl'];
  }
}
