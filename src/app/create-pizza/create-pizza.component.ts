import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICreatePizzaRequest } from '../model/i.create.pizza.request';
import { IIngredient } from '../model/i.Ingredient';
import { IPizza } from '../model/i.pizza';
import { ISize } from '../model/i.size';
import { IngredientService } from '../services/ingredient.service';
import { PizzaService } from '../services/pizza.service';

@Component({
  selector: 'app-create-pizza',
  templateUrl: './create-pizza.component.html',
  styleUrls: ['./create-pizza.component.scss']
})
export class CreatePizzaComponent implements OnInit {

  pizzForm!: FormGroup;
  pizzas: IPizza[] = [];
  selectedPizza!: IPizza;
  selectedIngredients: number[] = [];
  sizes!: ISize[];
  toppings!: IIngredient[];
  crust!: IIngredient[];
  sauce!: IIngredient[];

  constructor(public fb: FormBuilder,
    private ingredientService: IngredientService,
    private pizzaService: PizzaService
  ) { }

  ngOnInit(): void {
    this.createPizzaForm();
    this.getAllPizza();
    this.getSauce();
    this.getSizes();
    this.getAllCrust();
    this.getAllToppings();
  }

  public createPizzaForm(): void {
    this.pizzForm = this.fb.group({
      pizzaId: [],
      numberOfPizza: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      toppingId: [],
      sizeId: [],
      crustId: [],
      sauceId: [],
      isAddCheese: [false],
      isAddExtraCheese: [false]
    });
  }
  public getAllPizza() {
    this.pizzaService.getAllPizza().subscribe((result) => {
      this.pizzas = result;
    });
  }

  public onPizzaSelected($event: any): void {
    if ($event && $event.target && $event.target.value) {
      const pizzaId = this.pizzForm.controls['pizzaId'].value;
      this.pizzaService.getPizzaById(pizzaId).subscribe((result) => {
        if (result) {
          this.selectedPizza = result;
        }
      });
    }

  }

  public getSauce(): void {
    this.ingredientService.getSauce().subscribe((result) => {
      this.sauce = result;
    });
  }
  public onSauceSelected($event: any): void {
    if (this.pizzForm.controls['sauceId'].value) {
      this.prirceByIngredient(this.pizzForm.controls['sauceId'].value);
    }
  }

  public getAllToppings(): void {
    this.ingredientService.getToppings().subscribe((result) => {
      this.toppings = result;
    });
  }

  public onToppingSelected($event: any): void {
    if (this.pizzForm.controls['toppingId'].value) {
      this.prirceByIngredient(this.pizzForm.controls['toppingId'].value);
    }
  }

  public getAllCrust(): void {
    this.ingredientService.getCrust().subscribe((result) => {
      this.crust = result;
    });
  }
  public onCrustSelected($event: any): void {
    if (this.pizzForm.controls['crustId'].value) {
      this.prirceByIngredient(this.pizzForm.controls['crustId'].value);
    }
  }

  public getSizes(): void {
    this.ingredientService.getSizes().subscribe((result) => {
      this.sizes = result;
    });
  }
  public onSizeSelected($event: any): void {
    if (this.pizzForm.controls['sizeId'].value && this.selectedPizza) {
      const size = this.pizzForm.controls['sizeId'].value;
      switch (size) {
        case '1':
          this.selectedPizza.price = this.selectedPizza.price * 1;
          break;
        case '2':
          this.selectedPizza.price = this.selectedPizza.price * 2;
          break;
        case '3':
          this.selectedPizza.price = this.selectedPizza.price * 3;
          break;
        default:
          this.selectedPizza.price = this.selectedPizza.price + 0;
      }
    }
  }

  public onNumberOfPizza($event: any): void {
    if (this.pizzForm.controls['numberOfPizza'].value &&
      this.selectedPizza) {
      this.selectedPizza.price = this.selectedPizza.price * this.pizzForm.controls['numberOfPizza'].value;
    }
  }
  public onAddCheeseChange(event: any): void {
    if (event && event.target && event.target.value && this.selectedPizza) {
      this.selectedPizza.price = this.selectedPizza.price + 30;
    }

  }

  public onAddExtraCheeseChange(event: any): void {
    if (event && event.target && event.target.value && this.selectedPizza) {
      this.selectedPizza.price = this.selectedPizza.price + 60;
    }
  }

  public prirceByIngredient(ingredientId: number): void {
    if (ingredientId) {
      this.ingredientService.getIngredientById(ingredientId).subscribe((result) => {
        if (result && this.selectedPizza) {
          this.selectedIngredients.push(result.id);
          this.selectedPizza.price = this.selectedPizza.price + result.price;
        }
      });
    }

  }

  public onCreatePizza(): void {
    if (this.pizzForm.valid) {
      let request: ICreatePizzaRequest = {
        name: this.selectedPizza ? this.selectedPizza.name : 'New Custom Pizza',
        numberOfPizza: +this.pizzForm.controls.numberOfPizza.value,
        isAddCheese: this.pizzForm.controls.isAddCheese.value,
        isAddExtraCheese: this.pizzForm.controls.isAddExtraCheese.value,
        ingredients: this.selectedIngredients,
        size: +this.pizzForm.controls.sizeId.value
      };
      if (this.selectedPizza.id === 99) {
        this.pizzaService.createCustomPizza(request).subscribe((result) => {
          alert("Pizza ordered successfully.");
        });
      } else {
        this.pizzaService.createPizza(request, this.selectedPizza.id).subscribe((result) => {
          alert("Pizza ordered successfully.");
        });
      }
    }

  }

}
