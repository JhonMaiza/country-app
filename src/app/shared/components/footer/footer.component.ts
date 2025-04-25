import { Component, computed } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
})
export class FooterComponent { 
  year = computed(
    () => (new Date().getFullYear())
  )

}
