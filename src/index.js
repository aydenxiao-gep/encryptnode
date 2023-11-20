const prompt = require('prompt-sync')();
var AES = require('crypto-js/aes');
var KEY = 'ayden';
var text = prompt('Please input plaintext here: ');
var tokens = '';
if(text.indexOf('access_token=') > -1) {
    tokens = extractTokens(text);
} else {
    tokens = AES.encrypt(text, KEY).toString()
}

console.log(tokens);

function extractTokens(orginal) {
    let tokens = [];
    orginal && orginal.split('&').filter(a => a.includes('token=')).forEach(t => {
        let tk = t.substring(t.indexOf('=') + 1);
        tokens.push(AES.encrypt(tk, KEY).toString());
    });
    return tokens;
}