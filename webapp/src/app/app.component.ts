import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'profile-managemrnt';
  activeMenu: string = '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  openTree: boolean = false;
  compare!: any;
  token!: string;

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
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res: any) => {
        let valid = res.url.indexOf('validate');
        if (valid === -1) {
        this.token = localStorage.getItem('token')!;
          if (!this.token) {
            location.replace(environment.portal);
          }
        }
        if (res.url === '/') {
          this.activeMenu = 'modulos';
        } else {
          this.activeMenu = res.url.split('/')[1];
        }
      });
  }
  

  recize() {
    this.openTree = this.openTree === true ? false : true;
  }

  navigator(route: any) {
    switch (route) {
      case 'modulos':
        this.router.navigate(['/modulos']);
        break;
      case 'perfis':
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

  openApp(port: number): void {
   
    location.replace(`http://localhost:${port}/validate/${this.token}`);
  }

  logout(): void {
    this.userService.logout();
  }
}
