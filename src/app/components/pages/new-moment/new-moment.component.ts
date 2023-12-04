import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss']
})
export class NewMomentComponent implements OnInit {

  btnText:string = 'Compartilhar'

  constructor() { }

  ngOnInit(): void {
  }

}
