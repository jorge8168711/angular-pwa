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

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loading = true;
    this.httpClient.get<any>('https://jsonplaceholder.typicode.com/users').toPromise()
      .then((res) => {
        this.data = res;
        console.log(res, this.data);
        this.loading = false;
      })
      .catch(err => console.log(err));
  }

  public getImageUrl(item: Result) {
    return `${item.thumbnail.path}.${item.thumbnail.extension}`;
  }
}
