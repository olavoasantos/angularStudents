export default class Errors {

  /** Armazenamento dos erros */
  protected errors: object;

  /**
   * constructor
   * ---
   * Cria uma nova instância de errors
   */
  constructor(errors: object = {}) {
    this.errors = errors;
  }

  /**
   * has
   * ---
   * Checa se existem erros associados
   * a um campo.
   * @param field Nome de um campo
   */
  public has(field: string) : boolean {
    return this.errors.hasOwnProperty(field);
  }

  /**
   * empty
   * ---
   * Checa se existe algum erro.
   */
  public empty() : boolean {
    return Object.keys(this.errors).length === 0;
  }

  /**
   * get
   * ---
   * Retorna os erros associados a um campo
   * ou todos os erros.
   * @param field Nome do campo
   */
  public get(field: string) {
    return this.has(field) ? this.errors[field]
                           : this.errors;
  }

  /**
   * push
   * ---
   * Adiciona um novo erro relacionado a
   * um campo.
   * @param field Nome do campo
   * @param value Erro
   */
  public push(field: string, value: string) {
    (this.has(field)) ? this.errors[field].push(value)
                      : this.errors[field]  =  [value];
  }

  /**
   * clear
   * ---
   * Limpa os erros associados a um campo
   * ou limpa todos os erros.
   * @param field Nome do campo
   */
  public clear(field: string = null) {
    if(field) {
      delete this.errors[field];
      return;
    }

    this.errors = {};
  }

}