import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from 'src/environments/environment';
import { IIngredient } from '../model/i.Ingredient';
import { ISize } from '../model/i.size';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  ingredients!: IIngredient[];
  constructor(private httpClient: HttpClient) { }

  public getAllIngredients():  Observable<IIngredient[]> {
    const route = environment.host_url + 'api/v1/Ingredients';
    return this.httpClient.get<IIngredient[]>(route);

  }
  public getToppings():  Observable<IIngredient[]> {
    const route = environment.host_url + 'api/v1/Ingredients/Toppings';
    return this.httpClient.get<IIngredient[]>(route);

  }

  public getCrust():  Observable<IIngredient[]> {
    const route = environment.host_url + 'api/v1/Ingredients/Crust';
    return this.httpClient.get<IIngredient[]>(route);

  }

  public getSauce():  Observable<IIngredient[]> {
    const route = environment.host_url + 'api/v1/Ingredients/Sauce';
    return this.httpClient.get<IIngredient[]>(route);

  }
  public getSizes():  Observable<ISize[]> {
    const route = environment.host_url + 'api/v1/Ingredients/size';
    return this.httpClient.get<ISize[]>(route);

  }
  public getIngredientById(Id: number): Observable<IIngredient> {
    const route = environment.host_url + `api/v1/Ingredients/${Id}`;
    return this.httpClient.get<IIngredient>(route);
  }
}
