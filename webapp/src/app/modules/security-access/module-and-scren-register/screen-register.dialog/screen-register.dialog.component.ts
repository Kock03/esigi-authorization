import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { ModuleProvider } from 'src/providers/module.provider';
import { ScreenProvider } from 'src/providers/screen.provicer';
import { RequireMatch } from 'src/services/autocomplete.service';
import { ErrorStateMatcherService } from 'src/services/error.state.matcher.service';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-screen-register.dialog',
  templateUrl: './screen-register.dialog.component.html',
  styleUrls: ['./screen-register.dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScreenRegisterDialogComponent implements OnInit {
  screenForm!: FormGroup;
  matcher = new ErrorStateMatcherService();
  moduleControl = new FormControl('', [Validators.required, RequireMatch]);

  modules!: any[] | any[];
  filteredModules?: any[];
  filteredModuleList: any;
  moduleValid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ScreenRegisterDialogComponent>,
    private moduleProvider: ModuleProvider,
    private fb: FormBuilder,
    private snackbarService: SnackBarService,
    private screenProvider: ScreenProvider,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getModuleListActive();
    this.initFilter();
  }

  close() {
    this.dialogRef.close();

  }


  initForm(): void {
    this.screenForm = this.fb.group({
      Module: [null],
      name: ['', Validators.required],
      inactive: [false],
    });

    this.moduleControl.valueChanges.subscribe((res) => {
      if (res && res.id) {
        this.screenForm.controls['Module'].setValue(res.id, {
          emitEvent: true,
        });
      }
    });
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
    if(data.inactive === null){
      data.inactive = false;
    }
    try {
      await this.screenProvider.store(data);
      this.screenForm.reset();
      this.moduleControl.reset();
      this.dialogRef.close();
      this.snackbarService.showAlert('Tela cadastrada com sucesso!');
    } catch (error: any) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao cadastrar!');
    }
  }


}
