const { generateKeyPairSync, publicEncrypt, privateDecrypt, constants, KeyObject } = require('crypto');
const fs = require('fs');
const os = require('os');

const HOMEDIR = os.homedir();
const SSHDir = '.ssh';

/**
 * Generate a public and private key
 * @returns publicKey, privateKey
 */
const generateKey = () => {
    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
        // The standard secure default length for RSA keys is 2048 bits
        modulusLength: 4096,
    });

    return {
        publicKey: publicKey.export({
            type: "pkcs1",
            format: "pem",
        }),
        privateKey: privateKey.export({
            type: "pkcs1",
            format: "pem",
        })
    }
};

/**
 * Encrypt data by using a public key passed by a client
 * @param {String} payload 
 * @param {PubicKey} publicKey 
 * @returns encrypted string
 */
const encryptPayload = (payload, publicKey) => {
    return publicEncrypt(
        {
            key: publicKey,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(payload)
    ).toString('base64');
};

/**
 * Decrypt data by using a private key passed by a client
 * @param {String} payload 
 * @param {PrivateKey} privateKey 
 * @returns decrypted string
 */
const decryptPayload = (payload, privateKey) => {
    return  privateDecrypt(
        {
            key: privateKey,
            padding: constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: "sha256",
        },
        Buffer.from(payload, 'base64')
    ).toString();
};

/**
 * Ensure file system structure is in place
 */
const dirVerify = () => {
    const dir = `${HOMEDIR}/${SSHDir}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};

const getKey = keyName => {
    return fs.readFileSync(`${HOMEDIR}/${SSHDir}/${keyName}`, 'utf-8');
};

const saveKey = keyName => {
    fs.writeFileSync(`${HOMEDIR}/${SSHDir}/${keyName}`);
};

const savePublicKey = (keyName) => {
    saveKey(`${keyName}.pub`);
};

const getPublickKeyByName = (keyName) => {
    return getKey(`${keyName}.pub`);
};

const savePrivateKey = (keyName) => {
    saveKey(keyName);
};

const getPrivateKeyByName = (keyName) => {
    return getKey(`${keyName}`);
};

module.exports = {
    dirVerify
}