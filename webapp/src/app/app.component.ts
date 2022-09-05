import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'profile-managemrnt';
  activeMenu!: '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  openTree: boolean = false;
  compare!: any

  modulo: string = 'modulos';
  perfil: string = 'perfis';
  collaboratorId!: string | null;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    public translateService: TranslateService,
    private userService: UserService
  ) {
    translateService.addLangs(['en-US', 'pt-BR']);
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang('pt-BR');
    this.translateService.use('pt-BR');
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((res: any) => {
        this.activeMenu = res.url.split('/')[1];
      });
  }

  recize() {

    this.openTree = this.openTree === true ? false : true;
  }

  navigator(route: any) {
    console.log("🚀 ~ file: app.component.ts ~ line 79 ~ AppComponent ~ navigator ~ route", route)
    switch (route) {
      case 'modulo':
        this.router.navigate(['/modulos']);
        break;
      case 'perfil':
        this.router.navigate(['/perfis']);
        break;
    }
  }

  viewEdit() {
    this.router.navigate(['edit/novo']);
  }



  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 50);
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

  openApp(): void {
    location.replace(`http://192.168.8.184:3406/portal`);
  }

  logout(): void {
    this.userService.logout();
  }
}
