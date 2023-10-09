import { NgModule } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DataViewModule } from 'primeng/dataview';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
import { TagModule } from 'primeng/tag';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { TabMenuModule } from 'primeng/tabmenu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TreeModule } from 'primeng/tree';
import { ContextMenuModule } from 'primeng/contextmenu';
import { CalendarModule } from 'primeng/calendar';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
// add primeng components here
const modules = [
  AccordionModule,
  TableModule,
  InputTextModule,
  DialogModule,
  ToolbarModule,
  ConfirmDialogModule,
  RatingModule,
  InputNumberModule,
  InputTextareaModule,
  RadioButtonModule,
  DropdownModule,
  ButtonModule,
  CheckboxModule,
  InputMaskModule,
  PanelMenuModule,
  DataViewModule,
  ScrollPanelModule,
  SelectButtonModule,
  InputSwitchModule,
  MultiSelectModule,
  TagModule,
  AutoCompleteModule,
  TabViewModule,
  TabMenuModule,
  SplitButtonModule,
  TreeModule,
  ContextMenuModule,
  CalendarModule,
  DynamicDialogModule
]

@NgModule({
  imports: modules,
  exports: modules
})
export class PrimengModule { }
