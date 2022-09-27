
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleRegisterComponent } from './module-and-scren-register/module-register.component';
import { ProfileRegisterComponent } from './profile-register/profile-register.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatTreeModule} from '@angular/material/tree';
import { ModuleRegisterDialogComponent } from './module-and-scren-register/module-register.dialog/module-register.dialog.component';
import { ScreenRegisterDialogComponent } from './module-and-scren-register/screen-register.dialog/screen-register.dialog.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    ModuleRegisterComponent,
    ProfileRegisterComponent,
    ModuleRegisterDialogComponent,
    ScreenRegisterDialogComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatButtonModule,
    RouterModule,
    TranslateModule.forChild(),
    RouterModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    FormsModule
  ],
  entryComponents: [
    ModuleRegisterComponent,
    ProfileRegisterComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SecurityAccessModule { }
