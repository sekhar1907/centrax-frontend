import { NgModule } from "@angular/core";
import { DateDurationPipe } from "./date-duration.pipe";

const pipes = [
  DateDurationPipe
]

@NgModule({
  declarations: pipes,
  exports: pipes
})
export class SharedPipesModule { }
