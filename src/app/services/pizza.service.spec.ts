import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PizzaService } from './pizza.service';

describe('PizzaService', () => {
  let service: PizzaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(PizzaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be getAllPizza', () => {
    expect(service.getAllPizza).toBeDefined();
  });
  it('should be getPizzaById', () => {
    expect(service.getPizzaById).toBeDefined();
  });
  it('should be createCustomPizza', () => {
    expect(service.createCustomPizza).toBeDefined();
  });
  it('should be createPizza', () => {
    expect(service.createPizza).toBeDefined();
  });

});
