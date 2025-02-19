import { NgModule } from '@angular/core';
import { MatCardModule, MatCardFooter } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';   
import { MatIconModule } from '@angular/material/icon';       
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatTooltipModule } from '@angular/material/tooltip';   
import { MatSelectModule } from '@angular/material/select';  
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from "@angular/material/menu"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatListModule } from "@angular/material/list"
import { CommonModule } from '@angular/common';
import { MatTable, MatTableModule } from '@angular/material/table';

@NgModule({
  exports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSortModule,
    MatDialogModule,
    CommonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule
  ]
})
export class MaterialModule {}