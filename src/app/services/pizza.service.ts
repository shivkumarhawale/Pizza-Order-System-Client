import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreatePizzaRequest } from '../model/i.create.pizza.request';
import { IPizza } from '../model/i.pizza';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private httpClient: HttpClient) { }

  public getAllPizza(): Observable<IPizza[]> {
    const route = environment.host_url + 'api/v1/pizza';
    return this.httpClient.get<IPizza[]>(route);
  }

  public getPizzaById(id: number): Observable<IPizza> {
    const route = environment.host_url + `api/v1/pizza/${id}`;
    return this.httpClient.get<IPizza>(route);
  }

  public createCustomPizza(request: ICreatePizzaRequest): Observable<any> {
    const route = environment.host_url + 'api/v1/pizza/order';
    return this.httpClient.post<any>(route, request);
  }

  public createPizza(request: ICreatePizzaRequest, pizzaId:number): Observable<any> {
    const route = environment.host_url + `api/v1/pizza/order/${pizzaId}`;
    return this.httpClient.post<any>(route, request);
  }
}
