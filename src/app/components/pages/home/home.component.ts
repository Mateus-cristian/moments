import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';

import { faSearch, fas } from '@fortawesome/free-solid-svg-icons';
import { IMoment } from 'src/app/interfaces/Moment';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allMoments: IMoment[] = [];
  filterMoment: IMoment[] = [];

  baseApiUrl = environment.baseApiUrl;

  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private momentService: MomentService) {}

  ngOnInit(): void {
    this.momentService.getMoments().subscribe((response) => {
      const data = response.data;

      data.map((moment) => {
        moment.created_at = new Date(moment.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMoments = data;
      this.filterMoment = data;
    });
  }

  search(event: any): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.allMoments = this.filterMoment.filter((moment) => {
      return moment.title.toLowerCase().includes(value);
    });
  }
}
