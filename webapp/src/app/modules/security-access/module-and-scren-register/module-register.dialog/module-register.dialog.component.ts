import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModuleProvider } from 'src/providers/module.provider';
import { ErrorStateMatcherService } from 'src/services/error.state.matcher.service';
import { SnackBarService } from 'src/services/snackbar.service';

@Component({
  selector: 'app-module-register.dialog',
  templateUrl: './module-register.dialog.component.html',
  styleUrls: ['./module-register.dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModuleRegisterDialogComponent implements OnInit {
  matcher = new ErrorStateMatcherService();
  
  moduleForm!: FormGroup;
  durationInSeconds = 5;

  constructor(
    public dialogRef: MatDialogRef<ModuleRegisterDialogComponent>,
    private moduleProvider: ModuleProvider,
    private fb: FormBuilder,
    private snackbarService: SnackBarService,
    
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  close() {
    this.dialogRef.close();

  }


  initForm(): void {
    this.moduleForm = this.fb.group({
      name: ['', Validators.required],
      inactive: [false],
    });
  }

  async saveModule() {
    const data = this.moduleForm.getRawValue();
    if (data.inactive === null) {
      data.inactive = false;
    }
    try {
      await this.moduleProvider.store(data);
      this.moduleForm.reset();
      this.snackbarService.showAlert('Módulo cadastrado com sucesso!');
      duration: this.durationInSeconds * 1;
      this.dialogRef.close();
    } catch (error: any) {
      console.error('ERROR 132' + error);
      this.snackbarService.showError('Falha ao cadastrar!');
    }
  }


}
