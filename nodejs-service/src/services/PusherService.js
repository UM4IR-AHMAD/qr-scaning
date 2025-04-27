require('dotenv').config();
const Pusher = require('Pusher');


class PusherService{
    /**
     * create pusher
     */
    constructor(){
        this.pusher = new Pusher({
            appId: process.env.PUSHER_APPID,
            key: process.env.PUSHER_KEY,
            secret: process.env.PUSHER_SECRET,
            cluster: process.env.PUSHER_CLUSTER,
            useTLS: process.env.PUSHER_USE_TLS
        });
    }

    /**
     * send qr code image url to frontend
     * @param {*} qrCodeURL 
     */
    async sendQrCodeToFrontend(qrCodeURL){
        this.pusher.trigger(
            process.env.PUSHER_CHANNEL, 
            process.env.PUSHER_EVENT, 
        {
            url: qrCodeURL
        });
        console.log('Qr code url sent to frontend.');
        
    }
}

module.exports = PusherService;