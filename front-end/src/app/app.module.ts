import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './Views/navbar/navbar.component';
import { StudentFormComponent } from './Views/student-form/student-form.component';
import { StudentIndexComponent } from './Views/student-index/student-index.component';
import { StudentComponent } from './Views/student-index/student/student.component';
import { StudentViewComponent } from './Views/student-view/student-view.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent,
    NavbarComponent,
    StudentIndexComponent,
    StudentComponent,
    StudentViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
