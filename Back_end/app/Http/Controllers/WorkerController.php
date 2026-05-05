<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Worker;

class WorkerController extends Controller
{
    public function index()
    {
        $workers = Worker::latest()->get();

        return response()->json([
            'data' => $workers
        ], 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'bio' => 'nullable|string',
        ]);

        $worker = Worker::create($validated);

        return response()->json([
            'message' => 'Worker created successfully',
            'data' => $worker
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $worker = Worker::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'role' => 'sometimes|string|max:255',
            'phone' => 'sometimes|string|max:20',
            'bio' => 'nullable|string',
        ]);

        $worker->update($validated);

        return response()->json([
            'message' => 'Worker updated successfully',
            'data' => $worker
        ], 200);
    }

    public function destroy($id)
    {
        $worker = Worker::findOrFail($id);

        $worker->delete();

        return response()->json([
            'message' => 'Worker deleted successfully'
        ], 200);
    }
}