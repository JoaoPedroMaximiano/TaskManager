<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tarefa;

class TarefaController extends Controller
{
    public function create()
    {
        return Inertia::render('Task/NewTask');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string',
            'status' => 'required|string|in:prioridade,secundario,importante,depois',
            'prazo' => 'required|string|date',
        ]);

        $task = Tarefa::create([
            'nome' => $request->nome,
            'status' => $request->status,
            'prazo' => $request->prazo,
            'user_id' => $request->user()->id,
        ]);

        return redirect()->route('dashboard');
    }

    public function edit($id)
    {
        $task = Tarefa::where('id', $id)->first();

        if ($task && $task->user_id === auth()->user()->id) {
            return Inertia::render('Task/EditTask', [
                'task' => $task
            ]);
        } else {
            return redirect()->route('dashboard');
        }
    }

    public function update(Request $request, $id) {
        $request->validate([
            'nome' => 'required|string',
            'status' => 'required|string|in:prioridade,secundario,importante,depois',
            'prazo' => 'required|string|date',
        ]);

        $task = Tarefa::find($id);
        $task->nome = $request->nome;
        $task->status = $request->status;
        $task->prazo = $request->prazo;
        $task->save();

        return redirect()->route('dashboard');
    }

    public function delete(Request $request)
    {
        $request->validate([
            'id' =>'required|integer|exists:tarefas,id',
        ]);

        $task = Tarefa::find($request->id);

        if ($task && $task->user_id === $request->user()->id) {
            $task->delete();
        }

        return redirect()->route('dashboard');
    }
}
