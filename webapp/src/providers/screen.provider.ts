import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ScreenProvider {
  constructor(private apiGateway: ApiGateway) { }


  ngOnInit(): void { }

  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.AUTHORIZATION_MS + 'screens')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findOne(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.AUTHORIZATION_MS + 'screens/:id', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findByName(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway.get(environment.AUTHORIZATION_MS + `screens/find/name?${query}`)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }


  update(id: string | null, screen: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put(environment.AUTHORIZATION_MS + 'screens/:id', { id: id }, screen)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  store(screen: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post(environment.AUTHORIZATION_MS + 'screens', screen)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  destroy(screenId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .delete(environment.AUTHORIZATION_MS + 'screens/' + screenId)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}
