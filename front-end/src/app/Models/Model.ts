import axios from 'axios';

export default class Model {
  
  public id:         number;
  public $data:      object;
  public url:        string;
  public static url: string;
  public form;
  

  constructor(data: object = {}) {
    this.$data = data;
  }

  /**
   * hydrate
   * ---
   * Relaciona os dados de um objeto com o modelo.
   * @param data Objeto contendo dados do modelo
   */
  protected hydrate(data: object) {
    for(let field in data) {
      this[field] = data[field];
      if(field in this.form) this.form[field] = data[field];
    }
  }

  /**
   * all
   * ---
   * Acessa a API para pegar todos as entradas
   * relacionadas ao modelo.
   * @returns Promise Array com instâncias do modelo
   */
  public static all() {
    let Collection = [];
    
    return new Promise((resolve, reject) => {
      axios.get(this.url)
      .then(response => {
        Collection = response.data.map(
          data => new this(data)
        );

        resolve(Collection);
      })
      .catch(error => {
        reject( error );
      });
    });
  }

  /**
   * store
   * ---
   * Envia os dados para a criação de
   * um novo modelo pela API.
   * @param data Dados do modelo
   */
  public static store(data) {
    return new Promise((resolve, reject) => {
      axios.post(this.url, data)
      .then(response => {
        resolve(new this(response.data));
      })
      .catch(error => {
        reject( error.response.data );
      });
    });
  }

  /**
   * update
   * ---
   * Envia dados para a atualização de
   * um modelo pela API.
   */
  public update() {
    return new Promise((resolve, reject) => {
      axios.patch(`${this.url}/${this.id}`, this.form)
      .then(response => {
        this.hydrate(response.data);
        this.$data = response.data;

        resolve(this);
      })
      .catch(error => {
        reject( error.response.data );
      });
    });
  }

  /**
   * delete
   * ---
   * Aciona uma rota da API para a
   * deleção de um modelo.
   */
  public delete() {
    return new Promise((resolve, reject) => {
      axios.delete(`${this.url}/${this.id}`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject( error );
      });
    });
  }

}