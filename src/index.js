const prompt = require('prompt-sync')();
var CryptoJS = require('crypto-js');
var AES = require('crypto-js/aes');
var KEY = 'ayden';
var actionType = prompt('Action type: 1 - Encrypt; 2 - Decrypt; :(1) ');
if(!actionType) actionType = 1;
if(actionType == 1) {
    let text = prompt('Please input plaintext here: ');
    let tokens = '';
    if(text.indexOf('access_token=') > -1) {
        tokens = extractTokens(text);
    } else {
        tokens = AES.encrypt(text, KEY).toString()
    }
    console.log(`localStorage.setItem('ghm', '${JSON.stringify(tokens)}')`);
    console.log(tokens);
} else {
    let ciphertext = prompt('Please input ciphertext here: ');
    let text = decrypt(ciphertext);
    console.log(text)
}

function extractTokens(orginal) {
    let tokens = [];
    orginal && orginal.split('&').filter(a => a.includes('token=')).forEach(t => {
        let tk = t.substring(t.indexOf('=') + 1);
        tokens.push(AES.encrypt(tk, KEY).toString());
    });
    return tokens;
}

function decrypt(ciphertext) {
    let bytes = AES.decrypt(ciphertext, KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}