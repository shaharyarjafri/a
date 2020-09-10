import { NgModule, Injectable } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Http } from "@angular/http";
import {User} from "../model/user.module";
import { BrowserModule } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
@Injectable()
export class ApiModule {
  private KEY_AUTHENTICATION: string = "authentication";

  constructor(private http: Http, private router: Router) {}

  private getUrl(url: string): string {
    return `${environment.apiUrl}` + url;
  }

  public getUserObject(): any {
    if (localStorage.getItem(this.KEY_AUTHENTICATION)) {
      return JSON.parse(localStorage.getItem(this.KEY_AUTHENTICATION)).user;
    }
    this.router.navigate([`/session/login`]);
  }

  public async login(email: string, password: string, cb: Function) {
    let loginObserver = await this.http.post(this.getUrl("Clients/login?include=user"),{ email: email, password: password });
      loginObserver.subscribe(
      (response) => {
        localStorage.setItem(
          this.KEY_AUTHENTICATION,
          JSON.stringify(response.json())
        );
        cb(null, response);
      },
      (error) => {
        this.handleError(error, cb);
      }
    );
  }

  public signup(data: User, cb: Function) {
    let sendObeserver = this.http.post(
      this.getUrl(`Clients/upsertWithWhere?[where][email]=${data.email}`),
      data
    );
    sendObeserver.subscribe(
      (response) => {
        cb(null, response.json());
      },
      (error) => {
        this.handleError(error, cb);
      }
    );
  }


  private handleError(err: any, cb: any) {
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", err.error.message);
      var errorMsg = `'An error occurred:', ${err.error.message}`;
      cb(errorMsg);
      return errorMsg;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      var errorMsg =
        `Backend returned code ${err.status}, ` + `body was: ${err.error}`;
      console.error(errorMsg);
      cb(errorMsg);

      return `Backend returned code ${err.status}, ` + `body was: ${err.error}`;
    }
  }
}
