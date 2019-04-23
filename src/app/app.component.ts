import { Component, OnInit } from '@angular/core';
import { HttpMethod } from 'blocking-proxy/built/lib/webdriver_commands';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Data, Result } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public data = [];
  public loading = false;
  private baseUrl = 'https://gateway.marvel.com:443/v1/public/';
  private path = 'characters';
  private key = '35591db06a438788c7c8fcaab330df1a';

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loading = true;
    this.httpClient.get<Response>(`${this.baseUrl}/characters?apikey=${this.key}`).toPromise()
      .then((res: Response) => {
        this.data = res['data'];
        console.log(res, this.data);
        this.loading = false;
      })
      .catch(err => console.log(err));
  }

  public getImageUrl(item: Result) {
    return `${item.thumbnail.path}.${item.thumbnail.extension}`;
  }
}
