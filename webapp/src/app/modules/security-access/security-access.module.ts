import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleRegisterComponent } from './module-register/module-register.component';
import { ScreenRegisterComponent } from './screen-register/screen-register.component';
import { ProfileRegisterComponent } from './profile-register/profile-register.component';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    ModuleRegisterComponent,
    ScreenRegisterComponent,
    ProfileRegisterComponent
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
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    ModuleRegisterComponent,
    ScreenRegisterComponent,
    ProfileRegisterComponent
  ],
})
export class SecurityAccessModule { }
