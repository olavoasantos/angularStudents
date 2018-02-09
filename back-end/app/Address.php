<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'city',
        'state',
        'number',
        'street',
        'complement',
        'postal_code',
        'neighborhood'
    ];

    /**
     * student
     * ---
     * Relacionamento entre a tabela de endereços
     * e a tabela de estudantes.
     */
    public function student()
    {
        return $this->belongsTo('App\Student');
    }

}
