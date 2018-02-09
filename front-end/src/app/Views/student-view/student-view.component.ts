import { Component } from '@angular/core';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent {

  /** Acesso à Store */
  public window = window;
  
  /** Acesso ao estudante ativo */
  public student = window['$store'].state.student;

}
