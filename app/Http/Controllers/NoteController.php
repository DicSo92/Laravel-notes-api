<?php

namespace App\Http\Controllers;

use App\Note;
use Illuminate\Http\Request;

class NoteController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $notes = Note::all();
        return $this->success($notes);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'content' => 'required|unique:notes|max:255',
            ]);
            $note = Note::create($validatedData);

            $result['data'] = $note->toArray();
            $result['status'] = true;
        } catch (\Exception $e) {
            $result['status'] = false;
            $result['message'] = 'Operation failed due to : '. $e->getMessage();
        }

        if ($result['status']) {
            return $this->success($result['data']);
        } else{
            return $this->fail($result['message']);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Note  $note
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $note = Note::find($id);

        if ($note) {
            return $this->success($note);
        }
        return $this->notFound('Note Not Found');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Note  $note
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $note = Note::find($id);
            if(!$note){
                return $this->notFound('Note not found !');
            }
            $validatedData = $request->validate([
                'content' => 'required|unique:notes|max:255',
            ]);
            $note->update($validatedData);

            $result['data'] = $note->toArray();
            $result['status'] = true;
        } catch (\Exception $e) {
            dd($e);
            $result['status'] = false;
            $result['message'] = 'Operation failed due to '. $e->getMessage();
        }

        if($result['status']){
            return $this->success($result['data']);
        }else{
            return $this->fail($result['message']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Note  $note
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        try {
            $note = Note::find($id);
            if(!$note){
                return $this->notFound('Note not found !');
            }
            $note->delete();

            $result['data'] = $note->toArray();
            $result['status'] = true;
        } catch (\Exception $e) {
            $result['status'] = false;
            $result['message'] = 'Operation failed due to : '. $e->getMessage();
        }

        if($result['status']){
            return $this->success($result['data']);
        }else{
            return $this->fail($result['message']);
        }
    }
}
