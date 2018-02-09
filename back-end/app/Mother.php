<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mother extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'cpf', 'charge_at'
    ];

    /**
     * student
     * ---
     * Relacionamento entre a tabela de mães
     * e a tabela de estudantes.
     */
    public function student()
    {
        return $this->belongsTo('App\Student');
    }

}
