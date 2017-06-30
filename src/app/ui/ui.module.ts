import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarComponent } from './tabbar/bar/bar.component';
import { TabitemComponent, UiTitleDirective } from './tabbar/tabitem/tabitem.component';
import { PanelComponent } from './tabbar/panel/panel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [  BarComponent,  TabitemComponent, UiTitleDirective, PanelComponent],
  exports:[BarComponent,  TabitemComponent, UiTitleDirective, PanelComponent]
})
export class UiModule { }
