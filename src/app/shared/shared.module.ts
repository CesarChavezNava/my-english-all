import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@NgModule({
  declarations: [TopBarComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule, TopBarComponent],
})
export class SharedModule {}
