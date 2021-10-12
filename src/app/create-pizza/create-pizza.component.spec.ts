import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { IIngredient } from '../model/i.Ingredient';
import { IPizza } from '../model/i.pizza';
import { ISize } from '../model/i.size';
import { IngredientService } from '../services/ingredient.service';
import { PizzaService } from '../services/pizza.service';

import { CreatePizzaComponent } from './create-pizza.component';

describe('CreatePizzaComponent', () => {
  let component: CreatePizzaComponent;
  let fixture: ComponentFixture<CreatePizzaComponent>;
  let ingredientService: IngredientService;
  let pizzaService: PizzaService;
  let pizza: IPizza = {
    id: 1,
    name: 'test',
    price: 100,
    description: 'test des',
    ingredients : [1]
  };

  let ingredients: IIngredient = {
    id: 1,
    name : 'ingredient',
    price: 30
  };

  let size: ISize = {
    name : 'Small',
    id: 1
  } 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePizzaComponent ],
      imports:[ReactiveFormsModule, HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePizzaComponent);
    component = fixture.componentInstance;
    ingredientService = TestBed.get(IngredientService);
    pizzaService = TestBed.get(PizzaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have default value ', () => {
    expect(component.pizzForm).toBeDefined();
    expect(component.pizzas).toBeDefined();
    expect(component.selectedPizza).toBeUndefined();
    expect(component.selectedIngredients).toBeDefined();
    expect(component.sizes).toBeUndefined();
    expect(component.toppings).toBeUndefined();
    expect(component.crust).toBeUndefined();
    expect(component.sauce).toBeUndefined();
  });
  it('should load all metadata and create pizza order form', () => {
    spyOn(component, 'createPizzaForm');
    spyOn(component, 'getAllPizza');
    spyOn(component, 'getSauce');
    spyOn(component, 'getSizes');
    spyOn(component, 'getAllCrust');
    spyOn(component, 'getAllToppings');
    component.ngOnInit();
    expect(component.createPizzaForm).toHaveBeenCalled();
    expect(component.getAllPizza).toHaveBeenCalled();
    expect(component.getSauce).toHaveBeenCalled();
    expect(component.getSizes).toHaveBeenCalled();
    expect(component.getAllCrust).toHaveBeenCalled();
    expect(component.getAllToppings).toHaveBeenCalled();
  });

  it('should create default order form', () => {
    component.createPizzaForm();
    expect(component.createPizzaForm).toBeDefined();
  });
  
  it('should get all pizzas', () => {
    spyOn(pizzaService, 'getAllPizza').and.returnValue(of([pizza]));
    component.getAllPizza();
    expect(component.pizzas.length).toEqual(1);
  });
  it('should get selected pizza detail', () => {
    spyOn(pizzaService, 'getPizzaById').and.returnValue(of(pizza));
    component.pizzForm.controls.pizzaId.setValue(1);
    component.onPizzaSelected({target: {value: 1}});
    expect(component.selectedPizza).toEqual(pizza);
  });
  it('should get all Sauce', () => {
    spyOn(ingredientService, 'getSauce').and.returnValue(of([ingredients]));
    component.getSauce();
    expect(component.sauce.length).toEqual(1);
  });
  it('should calculate price on  select sauce', () => {
    spyOn(component, 'prirceByIngredient');
    component.pizzForm.controls.sauceId.setValue(1);
    component.onSauceSelected({});
    expect(component.prirceByIngredient).toHaveBeenCalled();
  });
  it('should get all toppings', () => {
    spyOn(ingredientService, 'getToppings').and.returnValue(of([ingredients]));
    component.getAllToppings();
    expect(component.toppings.length).toEqual(1);
  });
  it('should calculate price on  select toppings', () => {
    spyOn(component, 'prirceByIngredient');
    component.pizzForm.controls.toppingId.setValue(1);
    component.onToppingSelected({});
    expect(component.prirceByIngredient).toHaveBeenCalled();
  });
  it('should get all crust', () => {
    spyOn(ingredientService, 'getCrust').and.returnValue(of([ingredients]));
    component.getAllCrust();
    expect(component.crust.length).toEqual(1);
  });
  it('should calculate price on  select crust', () => {
    spyOn(component, 'prirceByIngredient');
    component.pizzForm.controls.crustId.setValue(1);
    component.onCrustSelected({});
    expect(component.prirceByIngredient).toHaveBeenCalled();
  });
  it('should get all sizes', () => {
    spyOn(ingredientService, 'getSizes').and.returnValue(of([size]));
    component.getSizes();
    expect(component.sizes.length).toEqual(1);
  });
  it('should calculate price on  select size', () => {
    spyOn(component, 'prirceByIngredient');
    component.pizzForm.controls.sizeId.setValue(2);
    component.selectedPizza = pizza;
    component.onSizeSelected({});
    expect(component.selectedPizza.price).not.toEqual(0);
  });
  it('should calculate price for adding cheese', () => {
    expect(component.onAddCheeseChange).toBeDefined();
  });
  it('should calculate price for adding extra cheese', () => {
    expect(component.onAddExtraCheeseChange).toBeDefined();
  });

  it('should create custom pizza order', () => {
    spyOn(pizzaService, 'createCustomPizza').and.returnValue(of());
    component.pizzForm.controls.numberOfPizza.setValue(1);
    component.pizzForm.controls.isAddCheese.setValue(true);
    component.pizzForm.controls.isAddExtraCheese.setValue(true);
    component.pizzForm.controls.sizeId.setValue(2);
    component.selectedIngredients = [1,2];
    component.selectedPizza = pizza;
    component.selectedPizza.id = 99;
    component.onCreatePizza();
    expect(pizzaService.createCustomPizza).toHaveBeenCalled();
  });
  
});
