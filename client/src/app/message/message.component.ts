import { Component, OnInit } from '@angular/core';
import { MessageService } from '../_services/message.service'

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.sass']
})
export class MessageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
