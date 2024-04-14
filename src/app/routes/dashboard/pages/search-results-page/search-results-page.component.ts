import { HttpClient } from '@angular/common/http';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Volume, VolumeSearchResponse } from 'src/app/core/models/volume';
import { AutoDestroyService } from 'src/app/core/services/utils/auto-destroy.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-search-results-page',
  templateUrl: './search-results-page.component.html',
  styleUrls: ['./search-results-page.component.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonSearchbar,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    FormsModule,
  ],
  providers: [AutoDestroyService],
})
export class SearchResultsPageComponent implements OnInit {
  searchString: string = '';
  search$: Subject<string> = new Subject();
  $volumes: WritableSignal<Volume[]> = signal([]);
  constructor(
    private http: HttpClient,
    private readonly destroy$: AutoDestroyService
  ) {}

  ngOnInit() {
    this.subscribeToSearchChanges();
  }

  subscribeToSearchChanges(): void {
    this.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((searchTerm) => this.$volumes.set([])),
        filter((searchTerm) => searchTerm.length > 0),
        switchMap((searchTerm) => {
          return this.http.get<VolumeSearchResponse>(
            `${environment.books_api}/volumes?q=${searchTerm}&maxResults=40`
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((res: VolumeSearchResponse) => this.$volumes.set(res.items));
  }
}
