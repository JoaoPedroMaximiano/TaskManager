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
            'prazo' => 'required|string',
        ]);

        $task = Tarefa::create([
            'nome' => $request->nome,
            'status' => $request->status,
            'prazo' => $request->prazo,
            'user_id' => $request->user()->id,
            'created_at' => date(),
        ]);

        return redirect()->route('dashboard');
    }
}
