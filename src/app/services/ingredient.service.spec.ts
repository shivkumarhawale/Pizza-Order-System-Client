import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { IngredientService } from './ingredient.service';

describe('IngredientService', () => {
  let service: IngredientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(IngredientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be getAllIngredients', () => {
    expect(service.getAllIngredients).toBeDefined();
  });
  it('should be getToppings', () => {
    expect(service.getToppings).toBeDefined();
  });
  it('should be getCrust', () => {
    expect(service.getCrust).toBeDefined();
  });
  it('should be getSauce', () => {
    expect(service.getSauce).toBeDefined();
  });
  it('should be getSizes', () => {
    expect(service.getSizes).toBeDefined();
  });
  it('should be getIngredientById', () => {
    expect(service.getIngredientById).toBeDefined();
  });
});


