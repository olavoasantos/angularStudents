import Errors from './Errors';
import Student from '../Models/Student.model';

export default class Store {

  /**
   * Estados da aplicação
   */
  state = {
    student: null,
    students: null,
    route: 'index',
    errors: new Errors,
    form: (new Student).form,
  }

  /**
   * setRoute
   * ---
   * Altera a rota da aplicação.
   * @param route Nome da rota
   */
  setRoute(route) {
    this.state.route = route;
  }

  /**
   * clearForm
   * ---
   * Limpa o formulário e reseta
   * o estudante selecionado.
   */
  clearForm() {
    this.state.form = (new Student).form;
    this.state.student = null;
  }

  /**
   * return
   * ---
   * Retorna para a página principal
   * e limpa o formulário.
   */
  return() {
    this.setRoute('index');
    this.clearForm();
  }

  /**
   * getStudents
   * ---
   * Faz um chamado para a API para
   * buscar todos os estudantes.
   */
  getStudents() {
    Student.all().then(students => {
      this.state.students = students;
    });
  }

  /**
   * addStudent
   * ---
   * Adiciona um novo estudante à
   * lista de estudantes.
   * @param student Estudante
   */
  addStudent(student) {
    this.state.students.push(student);
  }

  /**
   * storeStudent
   * ---
   * Adiciona um novo estudante através de
   * uma chamada para a API.
   */
  storeStudent() {
    Student.store(this.state.form)
           .then(student => this.addStudent(student))
           .catch(err => this.state.errors['errors'] = err);
    this.setRoute('index');
    this.clearForm();
  }

  /**
   * showStudent
   * ---
   * Seleciona um estudante e ativa a rota
   * para visualização dos dados.
   * @param student Estudante
   */
  showStudent(student) {
    this.state.student = student;
    this.setRoute('show');
  }

  /**
   * editStudent
   * ---
   * Seleciona um estudante, associa seus dados
   * no formulário e ativa a rota para
   * edição dos dados.
   * @param student Estudante
   */
  editStudent(student) {
    student.form.action = 'edit';
    this.state.student = student;
    this.state.form = student.form;
    this.setRoute('form');
  }

  /**
   * updateStudent
   * ---
   * Faz uma chamada para a API para atualizar
   * os dados de um estudate.
   */
  updateStudent() {
    this.state.student.hydrate(this.state.form);
    this.state.student.update()
           .then(student => {
              this.state.students = this.state.students.map(
                Student => Student['id'] === student['id'] ? student : Student
              );
           })
           .catch(err => this.state.errors['errors'] = err);
    this.setRoute('index');
    this.clearForm();
  }

  /**
   * deleteStudent
   * ---
   * Faz um chamado para a API para deletar um
   * estudante e remove o estudante da lista.
   * @param student Estudante
   */
  deleteStudent(student) {
    const id = student.id;
    student.delete().then(r => {
      this.state.students = this.state.students.filter(student => student.id !== id);
    })
  }
  
}