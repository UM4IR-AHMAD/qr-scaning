require('dotenv').config();
const fs = require('fs');


/**
 * save qr code as image from canvas
 * @param {*} canvasData 
 * @returns qr code image
 */
function convertingCanvasToImage(canvasData){
    const base64Data = canvasData.replace(/^data:image\/png;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');    
    fs.writeFileSync(process.env.QR_CODE_IMAGE_PATH + 'qrcode.png', buffer);
    return buffer;
}


module.exports = {
    convertingCanvasToImage
}