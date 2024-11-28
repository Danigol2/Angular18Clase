import { Component, inject, input, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FireService } from '../../services/fire.service';
@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './view-recipe-favorite.component.html',
  styleUrl: './view-recipe-favorite.component.css'
})
export class ViewRecipeFavoriteComponent {
  fire=inject(FireService);

  /*
   @Input()
   id: string | undefined;
  */
  id = input.required<string>();

  $state: WritableSignal<any> = signal({
    data: null,
    loading: true,
    error: null
  })
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    this.$state.update(state => {
      return { ...state, loading: true }
    });
    let request = this.fire.getRecipesById(this.id());
    request?.subscribe({
      next: (data: any) => {
        this.$state.update(state => {
          return { ...state, loading: false, data: data }
        });
      },
      error: (error: any) => {
        console.error(error)
        this.$state.update(state => {
          return { ...state, loading: false, data: [], error: error }
        });
      }
    })
  }
}