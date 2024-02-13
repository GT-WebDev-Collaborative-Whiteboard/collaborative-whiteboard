import crypto from 'crypto';
import fs from 'fs';
import fernet from 'fernet';

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  }
});

crypto.randomBytes(32, (err, buffer) => {
  fs.writeFileSync('./fernet.pem', buffer.toString('base64'));
});

// console.log(privateKey, publicKey);
// fs.writeFileSync('./private.pem', privateKey);
// fs.writeFileSync('./public.pem', publicKey);