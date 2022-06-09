import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiGateway } from 'src/api-gateway';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ProfilesProvider {
  constructor(private apiGateway: ApiGateway) { }


  ngOnInit(): void { }

  findAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.AUTHORIZATION_MS + 'profiles')
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findOne(id: string | null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .get(environment.AUTHORIZATION_MS + 'profiles/:id', { id: id })
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  findByName(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway.get(environment.AUTHORIZATION_MS + `profiles/find/name?${query}`)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }


  update(id: string | null, screen: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .put(environment.AUTHORIZATION_MS + 'profiles/:id', { id: id }, screen)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  store(screen: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .post(environment.AUTHORIZATION_MS + 'profiles', screen)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }

  destroy(screenId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiGateway
        .delete(environment.AUTHORIZATION_MS + 'profiles/' + screenId)
        .subscribe((response: HttpResponse<any>) => {
          resolve(response.body);
        }, reject);
    });
  }
}
