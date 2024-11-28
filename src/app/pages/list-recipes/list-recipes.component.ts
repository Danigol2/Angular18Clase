import { Component, inject, Input, signal, WritableSignal } from '@angular/core'; 
import { ApiService } from '../../services/api.service'; 
import { Router } from '@angular/router'; 
import { NgClass } from '@angular/common'; 
import { Recipe } from '../../model/recipe'; 
import { FireService } from '../../services/fire.service'; 
import { FormModalComponent } from '../../modal/form-modal/form-modal.component';
 
@Component({ 
  selector: 'app-list-recipes', 
  standalone: true, 
  imports: [NgClass,FormModalComponent], 
  templateUrl: './list-recipes.component.html', 
  styleUrl: './list-recipes.component.css' 
}) 
export class ListRecipesComponent { 
  api = inject(ApiService); 
  router = inject (Router); 
  fire = inject(FireService); 
 
  @Input() 
  type:string=''; 
 
  @Input() 
  subtype:string=''; 
  
  isModalOpen:boolean = false;

  $state:WritableSignal<any>= signal ({ 
    loading:false, 
    error:false, 
    data:[] 
  }); 
 
  ngOnInit(){ 
    // Al inicio del componente 
    this.fetchData(); 
  } 
 
  fetchData(){ 
    // Llamamos al Servicio 
    this.$state.update( state => ( 
      {...state, loading:true} 
    )); 
 
    let request; 
    console.log("Fetching data");
    //  Cuando accedo a /recipes/favorites type=undefined
 
    switch(this.type){ 
      case 'category': 
        request=this.api.getRecipesByCategory(this.subtype); 
        break; 
      case 'nationality': 
        request=this.api.getRecipesByNationality(this.subtype); 
        break; 
      case undefined:
        request=this.fire.getRecipesWithID();
        break;
      default: 
        console.log('Fetching Favorites') 
        let recipe:Recipe= { 
          strMeal: 'Test', 
          strMealThumb: 'test', 
          strInstructions: 'test', 
          strYoutube: 'test', 
          strIngredients: 'test' 
        }; 
        this.fire.createRecipe(recipe); 
        this.fire.getRecipes().subscribe(data => { 
          console.log(data); 
        }) 
        request=null; 
    } 
 
    if(request){ 
      // Subscribimos al observable 
      request.subscribe({ 
        next:(data:any)=>{ 
          this.$state.update( state => ( 
            {...state, loading:false, error:false, data:data} 
          )); 
        }, 
        error:(err)=>{ 
          this.$state.update( state => ( 
            {...state, loading:false, error:err, data:[]} 
          )); 
        } 
      }) 
    }else 
      //Error 
      this.$state.update( state => ( 
        {...state, loading:false, error:'Categoría incorrecta'} 
      )); 
  } 
 
  goToRecipe(idMeal:string){ 
    // Ir a la pagina /recipe/:id 
    this.router.navigate(['recipe',idMeal]); 
  } 

  goToRecipeFavorite(idMeal:string){
    // Ir a la pagina /favorite/:id
    this.router.navigate(['favorite',idMeal]);
  }
  openModal() { 
    this.isModalOpen = true;
    history.pushState({},document.title);
    //Luego añadimos algo mas
  }

  closeModal($event?: any) {
    if ($event) {
    console.log("Desde el componente que abre el modal" +$event);
    }
    this.isModalOpen = false;
  }

  
  //-------------------------------------------------------------
  //--------------------------------------------------------------
  // Método para eliminar una receta
  async deleteRecipe(event:any,idMeal:string){
    event.stopPropagation();
    const confirmDelete = confirm("¿Estás seguro de que quieres eliminar esta receta?");
    if (!confirmDelete) {
      return;
    }

    try{
      await this.fire.deleteRecipe(idMeal);
      
    }catch(err){
      alert("Error al crear la receta" + err);
    }
  }


  // ----------------------------------------------------------------
  // ----------------------------------------------------------------
}