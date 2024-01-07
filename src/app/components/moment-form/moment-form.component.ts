import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IMoment } from 'src/app/interfaces/Moment';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.scss'],
})
export class MomentFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<IMoment>();

  @Input() btnText!: string;

  @Input() momentData: IMoment | null = null;

  momentForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(this.momentData?.id ?? ''),
      title: new FormControl(this.momentData?.title ?? '', [
        Validators.required,
      ]),
      description: new FormControl(this.momentData?.description ?? '', [
        Validators.required,
      ]),
      image: new FormControl(this.momentData?.image ?? ''),
    });
  }

  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    this.momentForm.patchValue({ image: file });
  }

  submit() {
    if (this.momentForm.invalid) {
      return;
    }

    this.onSubmit.emit(this.momentForm.value);
  }
}
