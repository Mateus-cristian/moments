import { Component, OnInit } from '@angular/core';
import { IMoment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.scss'],
})
export class NewMomentComponent implements OnInit {
  btnText: string = 'Compartilhar';

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {}

  createHandler(moment: IMoment) {
    const formData = new FormData();

    formData.append('title', moment.title);
    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    this.momentService.createMoment(formData).subscribe();
  }
}
