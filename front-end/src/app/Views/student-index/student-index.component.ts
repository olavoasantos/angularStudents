import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-index',
  templateUrl: './student-index.component.html',
  styleUrls: ['./student-index.component.scss']
})
export class StudentIndexComponent implements OnInit {
  
  /** Acesso à Store */
  public window = window;

  /** Acesso à lista de estudantes */
  public Students = this.window['$store'].state.students;

  /**
   * ngOnInit
   * ---
   * Inicializa a lista de estudantes.
   */
  ngOnInit() {
    window['$store'].getStudents();
  }

  /**
   * view
   * ---
   * Inicia a view para vizualização de
   * um estudante.
   * @param student Estudante
   */
  view(student) {
    window['$store'].showStudent(student);
  }

}
