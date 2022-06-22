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

  menuList = [
    {
      name: 'Segurança Módulos',
      icon: 'view_module',
      selected: false,
      action: 'modulos',
    },
    {
      name: 'Segurança Telas',
      icon: 'preview',
      selected: false,
      action: 'telas',
    },
    {
      name: 'Segurança Perfis',
      icon: 'person',
      selected: false,
      action: 'perfis',
    },
  ];

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
    location.replace(`http://localhost:3406/portal`);
  }

  logout(): void {
    this.userService.logout();
  }
}
