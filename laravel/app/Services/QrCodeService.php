<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class QrCodeService
{
    /**
     * store qrcode image
     * @return url
     */
    public static function saveQrCode(Request $request){
        //qr code image saving
        $path = $request->file('image')->store('qrCode', 'public');
        
        return (object)['imagePath' => $path];
    }
}
