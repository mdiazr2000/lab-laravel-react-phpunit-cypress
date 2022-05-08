<?php

namespace App\Jobs;

use App\Events\FileZipped;
use App\Models\FilesUser;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use ZipArchive;

class ProcessFile implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $fileUser;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(FilesUser $fileUser)
    {
        $this->fileUser = $fileUser;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        // Define Dir Folder
        $public_dir = public_path();
        // Zip File Name
        $zipFileName = $this->fileUser->saved_name.'.zip';
        // Create ZipArchive Obj
        $zip = new ZipArchive;
        if ($zip->open($public_dir.'/zip/'.$zipFileName, ZipArchive::CREATE) === true) {
            // Add File in ZipArchive
            $zip->addFile($public_dir.'/'.$this->fileUser->path, $this->fileUser->saved_name);
            // Close ZipArchive
            $zip->close();

            $this->fileUser->zip_name = $zipFileName;
            $this->fileUser->path_zip = '/zip/'.$zipFileName;
            $this->fileUser->status = 'Compressed';
            $this->fileUser->save();

            event(new FileZipped($this->fileUser));
        }
    }
}
