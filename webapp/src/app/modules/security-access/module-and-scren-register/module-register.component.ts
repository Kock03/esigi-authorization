import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModuleProvider } from 'src/providers/module.provider';
import { ScreenProvider } from 'src/providers/screen.provicer';
import { ErrorStateMatcherService } from 'src/services/error.state.matcher.service';
import { SnackBarService } from 'src/services/snackbar.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-module-and-scren-registerr',
  templateUrl: './module-and-scren-register.component.html',
  styleUrls: ['./module-and-scren-register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModuleRegisterComponent implements OnInit {
  range = new FormGroup({});
  moduleForm!: FormGroup;
  screenForm!: FormGroup;
  Screen: any;
  durationInSeconds = 5;


  matcher = new ErrorStateMatcherService();
  dataTableModule: [] = [];
  dataTableScreen: [] = [];
  Module: any;
  modules!: any[] | any[];
  filteredModules?: any[];
  index: any = null;
  screen!: any;
  method: string = '';
  filteredModuleList: any;
  module!: any;
  moduleControl = new FormControl();
  moduleValid: boolean = false;
  displayedColumnsScreen: string[] = ['moduleName', 'screenName'];
  displayedColumns: string[] = ['identifier', 'moduleName', 'inactive'];

  constructor(
    private moduleProvider: ModuleProvider,
    private fb: FormBuilder,
    private snackbarService: SnackBarService,
    private screenProvider: ScreenProvider,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getModuleList();
    this.getScreenList();
    this.getModuleListActive();
    this.initFilter();
  }

  initForm(): void {
    this.moduleForm = this.fb.group({
      name: ['', Validators.required],
      inactive: [false, Validators.required],
    });

    this.screenForm = this.fb.group({
      Module: [null],
      name: ['', Validators.required],
      inactive: [false, Validators.required],
    });

    this.moduleControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.screenForm.controls['Module'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });
  }

  async getModuleList() {
    const moduleList = await this.moduleProvider.findAll();
    this.dataTableModule = moduleList;
  }

  async saveModule() {
    const data = this.moduleForm.getRawValue();
    try {
      await this.moduleProvider.store(data);
      this.moduleForm.reset();
      this.getModuleList();
      this.snackbarService.showAlert('Módulo cadastrado com sucesso!');
      duration: this.durationInSeconds * 1;
    } catch (error: any) {
      console.error('ERROR 132' + error);
      this.snackbarService.showError('Falha ao cadastrar!');
    }
  }

  async getScreenList() {
    const screen = await this.screenProvider.findAll();
    this.dataTableScreen = screen;
  }

  async getModuleListActive() {
    this.filteredModuleList = this.modules =
      await this.moduleProvider.findActive();
  }

  private initFilter() {
    this.moduleControl.valueChanges
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((res) => {
        this._filter(res);
        if (res && res.id) {
          this.moduleValid = true;
        } else {
          this.moduleValid = false;
        }
      });
  }

  displayFn(user: any): string {
    if (typeof user === 'string' && this.modules) {
      return this.modules.find((module) => module.id === user);
    }
    return user && user.name ? user.name : '';
  }

  private async _filter(name: string): Promise<void> {
    const params = `name=${name}`;
    this.filteredModules = await this.moduleProvider.findByName(params);
  }

  async saveScreen() {
    const data = this.screenForm.getRawValue();
    try {
      await this.screenProvider.store(data);
      this.screenForm.reset();
      this.moduleControl.reset();
      this.getScreenList();
      this.snackbarService.showAlert('Tela cadastrada com sucesso!');
    } catch (error: any) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao cadastrar!');
    }
  }
}

