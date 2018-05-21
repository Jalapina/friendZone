import { Component, OnInit } from '@angular/core';
import { TagInputModule } from 'ngx-chips';

TagInputModule.withDefaults({
  tagInput: {
      placeholder: 'Add a Hobby',
      
      // add here other default values for tag-input
  },
  dropdown: {
      displayBy: 'my-display-value',
  },
  
});

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  
  isClassVisible: false;
  itemsAsObjects = ["Running","Reading"]
  constructor() { }

  ngOnInit() {
  }

}
