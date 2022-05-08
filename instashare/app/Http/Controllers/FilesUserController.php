<?php

namespace App\Http\Controllers;

use App\Events\FileZipped;
use App\Http\Requests\UploadFileRequest;
use App\Jobs\ProcessFile;
use App\Models\FilesUser;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;

class FilesUserController extends Controller
{
    /**
     * Upload the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function upload(UploadFileRequest $uploadFileRequest)
    {
        if ($file = $uploadFileRequest->file('file')) {
            $name = $file->getClientOriginalName();

            // check Name

            $found = FilesUser::where('name', $name)
                ->where('user_id', auth()->user()->getAuthIdentifier())
                ->first();
            if ($found) {
                $response = response()->json([
                    'message' => "File with name {$name} already exists",
                    'details' => [],
                ], 422);
                throw new HttpResponseException($response);
            }


            $ext = $file->extension();
            $saveName = uniqid().'.'.$ext;

            $path = $file->storeAs('storage', $saveName, ['disk' => 'public_uploads']);
            $name = $file->getClientOriginalName();

            //store your file into directory and db
            $save = new FilesUser();
            $save->name = $name;
            $save->saved_name = $saveName;
            $save->status = 'Upload';
            $save->size = $file->getSize();
            $save->path = $path;
            $save->user_id = auth()->user()->getAuthIdentifier();
            $save->save();

            // Run Job
            dispatch(new ProcessFile($save));
           // event(new FileZipped($save));

            return response()->json([
                'success' => true,
                'message' => "File {$name} is saved is in process of compressing",
                'file'    => $name,
            ]);
        }
    }


    /**
     * Donwload one file
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    public function downloadfile($id)
    {
        $fileUser = FilesUser::where('id', $id)->first();
        $filepath = public_path('zip\\'.$fileUser->zip_name);

        $headers = ['Content-Type: application/zip'];

        return response()->download($filepath, $fileUser->zip_name, $headers);
    }

    /**
     * List all the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function filesByUser()
    {
        $user_id = auth()->user()->getAuthIdentifier();

        $fileUser = FilesUser::where('user_id', $user_id)->with('User')->orderBy('id', 'desc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Files from user',
            'files'   => $fileUser,
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\FilesUser  $filesUser
     * @return \Illuminate\Http\Response
     */
    public function updateFile(Request $request, $id)
    {
        $idFromServer = $id;
        $name = $request->get('name');
        $fileUser = FilesUser::where('id', $idFromServer);
        $fileUser->update([
            'name' => $name,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Files updated!!',
            'files'   => $fileUser,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FilesUser  $filesUser
     * @return \Illuminate\Http\Response
     */
    public function destroy(FilesUser $filesUser)
    {
        //
    }
}
