const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });
  const page = await browser.newPage();
  await page.goto('https://web.whatsapp.com');
  
  await page.screenshot({path: 'webWhatsapp.png'});

  console.log('Page title: ', await page.title());
  
  

  const canvasData = await extractCanvasAndConvertToData(page);
  const buffer = convertingCavasToImage(canvasData);
  
  console.log('sending qr to api to get url');
  const formData = new FormData();
  try {
    // formData.append('image', fs.createReadStream('./qr.png'));
    formData.append('image', buffer, { filename: 'qr.png' });  
    const response = await axios.post('http://127.0.0.1:8000/api/qr-code-/generate-url', formData, {
      headers: {...formData.getHeaders()}
    });

    const qrImageUrl = response.data.url; // Assume API returns { url: "..." }
    console.log('Api sent URL:', qrImageUrl);
  } catch (error) {
    console.error('Failed to upload QR code:', error);
  }finally{
    await waitForQRScan(page);
    console.log('== nodes JS process done ==');
    await browser.close();
  };
  
})();

async function waitForQRScan(page) {
  try {
      // Wait up to 60 seconds for the QR code to be scanned (canvas disappears)
      await page.waitForSelector('canvas', { hidden: true, timeout: 60000 });
      console.log('QR scanned and user logged in');
      return true;
  } catch (err) {
      console.log('QR not scanned within 60 seconds.');
      return false;
  }
}

async function extractCanvasAndConvertToData(page){
  console.log('Whatsapp page loading...');
  await page.waitForSelector('canvas');
  console.log('Extaracting qr code canvas...');
  return page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    return canvas.toDataURL();
  });
}

function convertingCavasToImage(canvasData){
  console.log('Saving qr code to image format...');
  const base64Data = canvasData.replace(/^data:image\/png;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');
  fs.writeFileSync('qr.png', buffer);
  return buffer;
}