<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Events\QrCodeSent;


class QrCodeController extends Controller
{
    public function generateUrl(Request $request){

        // validating image file
        if (!$request->hasFile('image'))
            return response()->json(['error' => 'No image found'], 422);

         
        //qr code saving, generating url and sending url back
        $path = $request->file('image')->store('qr', 'public');
        $url = Storage::url($path);
        broadcast(new QrCodeSent($url));
        return response()->json(['url' => asset($url)]);
    }
}
