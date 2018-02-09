import axios from 'axios';

export default class ValidateRequired {

  /**
   * check
   * ---
   * Realiza a validação do campo para garantir
   * que ele não é vazio.
   * @param value Dado a ser validado
   * @returns Promise
   */
  static check(value) {
    return new Promise((resolve, reject) => {
      if(!value || value === null) {
        reject(this.fail());
        return;
      }

      resolve();
    })
  }

  /**
   * fail
   * ---
   * Mensagem de falha de validação.
   */
  static fail() {
    return 'Campo obrigatório'
  }

}