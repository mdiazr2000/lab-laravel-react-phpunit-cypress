<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FilesUser extends Model
{
    use HasFactory;

    protected $table = 'files_users';
    protected $fillable = [
        'name',
        'status',
        'size',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
