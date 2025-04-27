require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');
const PuppeteerService = require('./services/PuppeteerService');
const PusherService = require('./services/PusherService');



/**
 * send qr code to api and to get the URL
 * @param {*} qrCode 
 * @returns qr code url
 */
async function getQrCodeURLFromApi(qrCode){
  try {
    const formData = new FormData();
    formData.append('image', qrCode, { filename: 'qrcode.png' });        
    const response = await axios.post(process.env.API_QRCODE_GENEREATE_URL, formData);    
    
    return response.data.data.qrCodeUrl;
  } catch (error) {
    console.error('Failed to get qr code url: ' + error);
    return null;
  }
}


/**
 * main function
 */
async function main(){
  console.log('---- nodeJS started ----');
  
  const puppeteer = new PuppeteerService();
  await puppeteer.launchBrowser();
  await puppeteer.goWhatsAppWebPage();
  const qrCode = await puppeteer.getQrCode();

  const qrCodeUrl = await getQrCodeURLFromApi(qrCode);

  if (qrCodeUrl) {
    const pusher = new PusherService();
    pusher.sendQrCodeToFrontend(qrCodeUrl);
    await puppeteer.checkQrCodeScanned();
  }else
    console.log('qr code url not received');
    

  puppeteer.close();

  console.log('-- nodeJS end --');
}

// call main function
main().catch(console.errors);
