import {  Injectable} from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";


@Injectable()
export class RecipeService{
    recipeChanged=new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    //     new Recipe('Chilla', 'This is simply a test', 'https://www.funfoodfrolic.com/wp-content/uploads/2021/05/Besan-Chilla-Blog-Thumbnail-500x500.jpg',[
    //         new Ingredient('Onion',2),
    //         new Ingredient('Carrot',1)
    //     ]),
    //     new Recipe('Idli', 'This is simply a test', 'https://c.ndtvimg.com/2019-03/g49icpdk_world-idli-day-idli-generic_625x300_29_March_19.jpg',[
    //         new Ingredient('potato',2),
    //         new Ingredient('onion',1)
    //     ])
    // ];
    private recipes:Recipe[]=[];
    constructor(private slService:ShoppingListService){}
    setRecipes(recipes:Recipe[]){
        this.recipes=recipes;
        this.recipeChanged.next(this.recipes.slice());
    }
    getRecipes(){
        return this.recipes.slice();//return a copy of recipes array so now recipes cannot be accessed from outside
    }
    addIngredientsToShoppingList(ingredients:Ingredient[]){
        this.slService.addIngredients(ingredients);
    }
    getRecipe(id:number){
        return this.recipes[id];
    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());
    }
    updateRecipe(index:number,newRecipe:Recipe){
        this.recipes[index]=newRecipe;
        this.recipeChanged.next(this.recipes.slice());
    }
    deleteRecipes(index:number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
    }
}