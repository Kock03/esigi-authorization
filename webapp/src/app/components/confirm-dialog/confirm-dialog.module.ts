import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogService } from 'src/services/confirn-dialog.service';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [TranslateModule.forChild(), MatDialogModule, MatButtonModule, CommonModule, FlexLayoutModule,],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  providers: [ConfirmDialogService],
})
export class ConfirmDialogModule { }
