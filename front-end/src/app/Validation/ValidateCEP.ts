import axios from 'axios';

export default class ValidateCEP {

  /**
   * check
   * ---
   * Realiza a validação do CEP através de uma
   * chamada para a API do viacep.
   * @param value Dado a ser validado
   * @returns Promise
   */
  static check(value) {
    value = this.normalize(value);
    return new Promise((resolve, reject) => {
      if(value === null) {
        reject(this.fail());
        return;
      }

      const Authorization = axios.defaults.headers.common['Authorization'];
      delete axios.defaults.headers.common['Authorization'];

      axios.get(`https://viacep.com.br/ws/${value}/json/`).then(response => {
        resolve(response.data);
      }).catch(err => {
        reject(this.fail());
      });
      axios.defaults.headers.common['Authorization'] = Authorization;
    })
  }

  /**
   * normalize
   * ---
   * Normaliza o dado enviado.
   * @param value Dado a ser validado
   */
  static normalize(value) {
    return value !== null ? value.toString().replace(/[^\d]+/g, '') : value;
  }

  /**
   * fail
   * ---
   * Mensagem de falha de validação.
   */
  static fail() {
    return 'CEP inválido'
  }

}