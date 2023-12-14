import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMoment } from 'src/app/interfaces/Moment';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';

import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { IComment } from 'src/app/interfaces/Comment';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.scss'],
})
export class MomentComponent implements OnInit {
  moment?: IMoment;

  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  commentForm!:FormGroup;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService
      .getMoment(id)
      .subscribe((item) => (this.moment = item.data));


      this.commentForm = new FormGroup({
        text: new FormControl("", [Validators.required]),
        username: new FormControl("", [Validators.required])
      })
  }

  async handlerRemove(id: number) {
    await this.momentService.removeMoment(id).subscribe();

    this.messagesService.add('Momento excluído com sucesso');

    this.router.navigate(['/']);
  }

  get text(){
    return this.commentForm.get('text')!;
  }

  get username(){
    return this.commentForm.get('username')!;
  }

  async onSubmit(formDirective:FormGroupDirective){
      if(this.commentForm.invalid){
        return;
      }

      const data:IComment = this.commentForm.value;


      data.momentId = Number(this.moment?.id);

      await this.commentService.createComment(data).subscribe((comments) => this.moment?.comments?.push(comments.data));

      this.messagesService.add('Comentário adicionado!');

      this.commentForm.reset();

      formDirective.resetForm();
  }

}
