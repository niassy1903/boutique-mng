<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function index()
    {
        return response()->json(Notification::with('utilisateur')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'utilisateur_id' => 'required|exists:utilisateurs,id',
            'titre' => 'required|string|max:255',
            'message' => 'required|string',
            'type' => 'in:info,alerte,promotion',
            'lu' => 'boolean',
            'date_envoi' => 'nullable|date',
        ]);

        $notification = Notification::create($validated);
        return response()->json(['message' => 'Notification créée ✅', 'data' => $notification], 201);
    }

    public function show($id)
    {
        $notification = Notification::with('utilisateur')->find($id);
        if (!$notification) return response()->json(['message' => 'Notification non trouvée'], 404);
        return response()->json($notification);
    }

    public function update(Request $request, $id)
    {
        $notification = Notification::find($id);
        if (!$notification) return response()->json(['message' => 'Notification non trouvée'], 404);

        $notification->update($request->all());
        return response()->json(['message' => 'Notification mise à jour ✅']);
    }

    public function destroy($id)
    {
        $notification = Notification::find($id);
        if (!$notification) return response()->json(['message' => 'Notification non trouvée'], 404);

        $notification->delete();
        return response()->json(['message' => 'Notification supprimée ✅']);
    }
}
