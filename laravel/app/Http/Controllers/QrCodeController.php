<?php

namespace App\Http\Controllers;

use App\Events\QrCodeSent;
use App\Http\Resources\QrCodeResource;
use Illuminate\Http\Request;
use App\Services\QrCodeService;

class QrCodeController extends Controller
{
    /**
     * store qrcode image
     */
    public function generateUrl(Request $request){

        // validating image file
        if (!$request->hasFile('image'))
            return response()->json(['error' => 'No image found'], 422);

        $qrCode = QrCodeService::saveQrCode($request);
        return new QrCodeResource($qrCode);
    }
}
