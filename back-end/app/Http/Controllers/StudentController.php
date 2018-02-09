<?php

namespace App\Http\Controllers;

use App\Mother;
use App\Student;
use App\Address;
use Illuminate\Http\Request;

class StudentController extends Controller
{

    /**
     * index
     * ---
     * Retorna todos as entradas do banco de dados de estudantes
     * junto com os relacionamentos mãe e endereço.
     */
    public function index()
    {
        return response()->json( Student::with(['mother', 'address'])->get() );
    }

    /**
     * store
     * ---
     * Armazena um novo estudante, uma mãe
     * e um endereço no banco de dados.
     */
    public function store(Request $request)
    {
        /**
         * Validação do input
         */
        $this->validate($request, [
            'name'    => 'required|max:100',
            'birthday' => 'required|date',
            'grade' => 'required|integer|between:1,9',
            'mother.name' => 'required|max:100',
            'mother.cpf' => 'required',
            'mother.charge_at' => 'required',
            'address.postal_code' => 'required',
            'address.street' => 'required|max:120',
            'address.number' => 'required|integer',
            'address.complement' => 'max:50',
            'address.neighborhood' => 'required|max:100',
            'address.city' => 'required',
            'address.state' => 'required',
        ]);

        // Criação do estutante
        $student = new Student;
        $student->name = $request->name;
        $student->birthday = $request->birthday;
        $student->grade = $request->grade;
        $student->save();
        
        // Criação da mãe
        $mother = new Mother;
        $mother->name = $request->mother['name'];
        $mother->cpf = $request->mother['cpf'];
        $mother->charge_at = $request->mother['charge_at'];
        $mother->student_id = $student->id;
        $mother->save();
        
        // Criação do endereço
        $address = new Address;
        $address->postal_code = $request->address['postal_code'];
        $address->street = $request->address['street'];
        $address->number = $request->address['number'];
        $address->complement = $request->address['complement'];
        $address->neighborhood = $request->address['neighborhood'];
        $address->city = $request->address['city'];
        $address->state = $request->address['state'];
        $address->student_id = $student->id;
        $address->save();

        $student->mother = $mother;
        $student->address = $address;
        
        return response()->json($student);
    }

    /**
     * update
     * ---
     * Atualização de um estudante no banco de dados,
     * juntamente com as tabelas relacionadas.
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name'    => 'required|max:100',
            'birthday' => 'required|date',
            'grade' => 'required|integer|between:1,9',
            'mother.name' => 'required|max:100',
            'mother.cpf' => 'required',
            'mother.charge_at' => 'required',
            'address.postal_code' => 'required',
            'address.street' => 'required|max:120',
            'address.number' => 'required|integer',
            'address.complement' => 'max:50',
            'address.neighborhood' => 'required|max:100',
            'address.city' => 'required',
            'address.state' => 'required',
        ]);

        // Atualização do estudante
        $student = Student::where('id', $id)->with(['mother', 'address'])->firstOrFail();
        $student->name = $request->name;
        $student->birthday = $request->birthday;
        $student->grade = $request->grade;
        $student->save();
        
        // Atualização da mãe
        $mother = $student->mother;
        $mother->name = $request->mother['name'];
        $mother->cpf = $request->mother['cpf'];
        $mother->charge_at = $request->mother['charge_at'];
        $mother->student_id = $student->id;
        $mother->save();
        
        // Atualização do endereço
        $address = $student->address;
        $address->postal_code = $request->address['postal_code'];
        $address->street = $request->address['street'];
        $address->number = $request->address['number'];
        $address->complement = $request->address['complement'];
        $address->neighborhood = $request->address['neighborhood'];
        $address->city = $request->address['city'];
        $address->state = $request->address['state'];
        $address->student_id = $student->id;
        $address->save();
        
        return response()->json($student);
    }

    /**
     * destroy
     * ---
     * Deleção de um estudante e suas relações
     * das tabelas mãe e endereço.
     */
    public function destroy($id)
    {
        $student = Student::find($id);
        $student->address->delete();
        $student->mother->delete();
        $student->delete();

        return response('ok');
    }

}
