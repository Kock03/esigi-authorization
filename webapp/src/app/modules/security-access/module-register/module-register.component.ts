import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModuleProvider } from 'src/providers/module.provider';
import { ErrorStateMatcherService } from 'src/services/error.state.matcher.service';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-module-register',
  templateUrl: './module-register.component.html',
  styleUrls: ['./module-register.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModuleRegisterComponent implements OnInit {
  range = new FormGroup({});
  moduleForm!: FormGroup;

  matcher = new ErrorStateMatcherService();
  dataTable: [] = [];
  Module: any;
  displayedColumns: string[] = ['identifier', 'moduleName', 'inactive'];

  constructor(
    private moduleProvider: ModuleProvider,
    private fb: FormBuilder,
    private snackbarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getModuleList();
  }

  initForm(): void {
    this.moduleForm = this.fb.group({
      name: ['', Validators.required],
      inactive: [false, Validators.required],
    });
  }

  async getModuleList() {
    const moduleList = await this.moduleProvider.findAll();
    this.dataTable = moduleList;
  }

  async saveModule() {
    const data = this.moduleForm.getRawValue();
    try {
      await this.moduleProvider.store(data);
      this.initForm();
      this.getModuleList();
      this.snackbarService.showAlert('Módulo cadastrado com sucesso!');
    } catch (error: any) {
      console.log('ERROR 132' + error);
      this.snackbarService.showError('Falha ao cadastrar!');
    }
  }
}
