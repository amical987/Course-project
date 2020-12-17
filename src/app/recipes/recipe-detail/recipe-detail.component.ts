import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  animations: [
    trigger('wildState', [
      state('shrunken', style({
        transform: 'translateX(0) scale(1.05)'
      })),
      transition('* <=> shrunken', animate(500))
    ])
  ]
})
export class RecipeDetailComponent implements OnInit {
  wildState = 'normal';
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
    (params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  addToShoppingList(){
    this.recipeService.moveToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
