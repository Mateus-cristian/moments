import { Component, OnInit } from '@angular/core';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  faTimes = faTimes;
  faCheck = faCheck;

  colorToast: string = '';
  colorText: string = '';
  showSucess: boolean = false;
  showError: boolean = false;

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastInfo$.subscribe((toastInfo) => {
      this.colorToast = toastInfo.type === 'error' ? '#E5736E' : '#00FA9A';
      this.colorText = toastInfo.type === 'error' ? '#FF0000' : '#00ff00';
      this.showError = toastInfo.type === 'error';
      this.showSucess = toastInfo.type === 'success';
    });
  }
}
