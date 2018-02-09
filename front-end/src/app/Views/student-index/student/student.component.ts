import { Component, Input } from '@angular/core';
import Student from '../../../Models/Student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent {

  /** Acesso à Store */
  public window = window;
  
  /** Declaração do Prop 'student' */
  @Input() student: Student;

}
