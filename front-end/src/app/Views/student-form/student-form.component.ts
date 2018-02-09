import { Component, Input } from '@angular/core';

import Student from '../../Models/Student.model';
import ValidateCPF from '../../Validation/ValidateCPF';
import ValidateCEP from '../../Validation/ValidateCEP';
import ValidateRequired from '../../Validation/ValidateRequired';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})

export class StudentFormComponent {

  /** Acesso à Store */
  public window = window;
  /** Acesso à form */
  public form = window['$store'].state.form;
  /** Acesso aos errors */
  public errors = window['$store'].state.errors;

  /**
   * rules
   * ---
   * Regras de validação.
   */
  public rules() {
    return {
      'name': ['Required'],
      'birthday': ['Required'],
      'grade': ['Required'],
      'mother.name': ['Required'],
      'mother.cpf': ['Required', 'CPF'],
      'mother.charge_at': ['Required'],
      'address.postal_code': ['Required', 'CEP'],
      'address.street': ['Required'],
      'address.number': ['Required'],
      'address.complement': [],
      'address.neighborhood': ['Required'],
      'address.city': ['Required'],
      'address.state': ['Required'],
    }
  }

  /**
   * validate
   * ---
   * Realiza a validação do campo.
   * @param field Nome do campo
   * @param e Evento
   */
  validate(field, e) {
    this.rules()[field].forEach(rule => {
      this[`check${rule}`](field, e.target.value);
    });
  }

  /**
   * pushError
   * ---
   * Adiciona um erro à lista de
   * erros globais.
   * @param field Nome do campo
   * @param value Mensagem de erro
   */
  pushError(field, value) {
    window['$store'].state.errors.push(field, value);
  }

  /**
   * checkRequired
   * ---
   * Realiza a validação "Required"
   * de um campo.
   * @param field Nome do campo
   * @param value Dado a ser validado
   */
  checkRequired(field, value) {
    ValidateRequired
               .check(value)
               .then(response => {
                 window['$store'].state.errors.clear(field);
               })
               .catch( err =>  window['$store'].state.errors.push(field, err) );
  }

  /**
   * checkCEP
   * ---
   * Realiza a validação "CEP"
   * de um campo.
   * @param field Nome do campo
   * @param value Dado a ser validado
   */
  checkCEP(field, value) {
    ValidateCEP
              .check( value )
              .then(response => {
                window['$store'].state.errors.clear(field);
                this.assignAddress(response);
              })
              .catch( err =>  window['$store'].state.errors.push(field, err) );
  }

  /**
   * checkCPF
   * ---
   * Realiza a validação "CPF"
   * de um campo.
   * @param field Nome do campo
   * @param value Dado a ser validado
   */
  checkCPF(field, value) {
    ValidateCPF
              .check( value )
              .then(response => {
                window['$store'].state.errors.clear(field);
              })
              .catch( err =>  window['$store'].state.errors.push(field, err) );
  }

  /**
   * assignAddress
   * ---
   * Preenche dados do endereço obtidos
   * pela API do viacep.
   * @param data Dados da API da viacep
   */
  assignAddress(data) {
    window['$store'].state.form.address.street = data.logradouro;
    window['$store'].state.form.address.neighborhood = data.bairro;
    window['$store'].state.form.address.city = data.localidade;
    window['$store'].state.form.address.state = data.uf;
  }

  /**
   * submit
   * ---
   * Submete o formulário.
   */
  submit() {
    window['$store'].state.form.action === 'create'
                                  ? window['$store'].storeStudent()
                                  : window['$store'].updateStudent();
  }

}
