<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    // Fields you are allowed to fill using create() or update()
    protected $fillable = [
        'name',
        'objective',
        'description',
        'price',
        'quantity',
        'image',
    ];
}