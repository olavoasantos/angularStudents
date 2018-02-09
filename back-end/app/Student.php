<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'birthday', 'grade'
    ];

    /**
     * mother
     * ---
     * Relacionamento da tabela Estudante
     * com a tabela Mãe.
     */
    public function mother()
    {
        return $this->hasOne('App\Mother');
    }

    /**
     * address
     * ---
     * Relacionamento da tabela Estudante
     * com a tabela Endereços.
     */
    public function address()
    {
        return $this->hasOne('App\Address');
    }

}
