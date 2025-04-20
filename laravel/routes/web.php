<?php

use Illuminate\Support\Facades\Route;
use App\Events\QrCodeSent;

Route::get('/', function () {
    return view('welcome');
});


Route::get('test', function(){
    echo 'sent the url';
    $url = 'http://127.0.0.1:8000/storage/qr/xR5zl3pGniMHLu03Jxrwe0xsDHcdmExeqJVawjBl.png';
    broadcast(new QrCodeSent($url));
    // event(new QrCodeSent('this is the url'));

});