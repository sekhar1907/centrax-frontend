import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { RoleRedirects } from "../enums/roles.enum";

@Injectable()
export class RoleRedirectService {
    constructor(private router: Router) {}

    public navigate(role: number): void {
      console.log(role)
      console.log((RoleRedirects as any)[role])
      this.router.navigate([(RoleRedirects as any)[role]]);
    }
}
