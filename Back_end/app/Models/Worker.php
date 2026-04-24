<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Worker extends Model
{
    protected $fillable = [
        'name',
        'role',
        'phone',
        'bio',
    ];

    /**
     * A worker can perform many services
     */
    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class);
    }
}