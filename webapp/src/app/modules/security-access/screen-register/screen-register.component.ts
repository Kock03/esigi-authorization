import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ModuleProvider } from 'src/providers/module.provider';
import { ScreenProvider } from 'src/providers/screen.provicer';

import { ErrorStateMatcherService } from 'src/services/error.state.matcher.service';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-screen-register',
  templateUrl: './screen-register.component.html',
  styleUrls: ['./screen-register.component.scss'],
})
export class ScreenRegisterComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  screenForm!: FormGroup;
  Screen: any;

  modules!: any[] | any[];
  filteredModules?: any[];

  matcher = new ErrorStateMatcherService();
  index: any = null;
  screen!: any;
  dataTable: [] = [];
  method: string = '';
  filteredModuleList: any;
  module!: any;
  moduleControl = new FormControl();
  moduleValid: boolean = false;

  displayedColumns: string[] = ['moduleName', 'screenName'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private moduleProvider: ModuleProvider,
    private screenProvider: ScreenProvider,
    private snackbarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getScreenList();
    this.getModuleList();
    this.initFilter();
  }

  async getScreenList() {
    const screen = await this.screenProvider.findAll();
    this.dataTable = screen;
  }

  async getModuleList() {
    this.filteredModuleList = this.modules =
      await this.moduleProvider.findAll();
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

  initForm() {
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

  async saveScreen() {
    const data = this.screenForm.getRawValue();
    try {
      await this.screenProvider.store(data);
      this.initForm();
      this.moduleControl.reset();
      this.getScreenList();
      this.snackbarService.showAlert('Tela cadastrada com sucesso!');
    } catch (error: any) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao cadastrar!');
    }
  }
}
