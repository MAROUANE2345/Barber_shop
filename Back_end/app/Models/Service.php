<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Service extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'duration',
        'image',
    ];

    /**
     * A service can be done by many workers (barbers)
     */
    public function workers(): BelongsToMany
    {
        return $this->belongsToMany(Worker::class);
    }
}