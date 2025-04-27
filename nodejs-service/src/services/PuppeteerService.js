require('dotenv').config();
const puppeteer = require('puppeteer');
const {convertingCanvasToImage} = require('../helpers/helper');

class PuppeteerService {

    constructor() {
        this.browser = null;
        this.page = null;
    }

    /**
     * launch browser
     */
    async launchBrowser(){
        this.browser = await puppeteer.launch({
            executablePath: process.env.PUPPETEER_BROWSER_EXCUTABLE_PATH,
        });
    }

    /**
     * got to web.whatsapp.com
     */
    async goWhatsAppWebPage(){
        if (!this.browser) 
            throw new Error('Browser not initialized');
        
        this.page = await this.browser.newPage();
        await this.page.goto('https://web.whatsapp.com');
    }



    /**
     * get qr code and then extract that canvas data that has qr code
     * @returns qr Code image data
     */
    async getQrCode(){
        if (!this.page) 
            throw new Error('Page not initialized');
        
        // wait for qr code availability
        await this.page.waitForSelector('canvas');

        // extract qr code data from canvas
        const canvasData = await this.page.evaluate(()=>{
            const canvas = document.querySelector('canvas');
            return canvas.toDataURL();
        });

        return convertingCanvasToImage(canvasData);
    }


    /**
     * check the qr has scanned or expired
     */
    async checkQrCodeScanned(){
        try {
            await this.page.waitForSelector('canvas', { hidden: true, timeout: 60000 });
            console.log('Qr code has scanned');
        } catch (error) {
            console.log('Qr code has expired');
        }
    }

    /**
     * close the browser
     */
    async close(){
        if (this.browser) {
            await this.browser.close();
        }
    }

}


module.exports = PuppeteerService;