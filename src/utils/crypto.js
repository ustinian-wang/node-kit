import crypto from 'crypto';

/**
 * 使用 SHA-256 哈希算法对数据进行加密
 * @param {string} data - 要加密的数据
 * @returns {string} - 加密后的数据（以十六进制字符串形式返回）
 */
export function sha256(data) {
    return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}

/**
 * 使用 SHA-1 哈希算法对数据进行加密
 * @param {string} data - 要加密的数据
 * @returns {string} - 加密后的数据（以十六进制字符串形式返回）
 */
export function sha1(data) {
    return crypto.createHash('sha1').update(data, 'utf8').digest('hex');
}

/**
 * 使用 SHA-512 哈希算法对数据进行加密
 * @param {string} data - 要加密的数据
 * @returns {string} - 加密后的数据（以十六进制字符串形式返回）
 */
export function sha512(data) {
    return crypto.createHash('sha512').update(data, 'utf8').digest('hex');
}

/**
 * 使用 MD5 哈希算法对数据进行加密
 * @param {string} data - 要加密的数据
 * @returns {string} - 加密后的数据（以十六进制字符串形式返回）
 */
export function md5(data) {
    return crypto.createHash('md5').update(data, 'utf8').digest('hex');
}

/**
 * 使用 HMAC-SHA256 算法对数据进行加密
 * @param {string} key - 密钥
 * @param {string} data - 要加密的数据
 * @returns {string} - 加密后的数据（以十六进制字符串形式返回）
 */
export function hmacSha256(key, data) {
    return crypto.createHmac('sha256', key).update(data, 'utf8').digest('hex');
}

/**
 * 使用 HMAC-SHA1 算法对数据进行加密
 * @param {string} key - 密钥
 * @param {string} data - 要加密的数据
 * @returns {string} - 加密后的数据（以十六进制字符串形式返回）
 */
export function hmacSha1(key, data) {
    return crypto.createHmac('sha1', key).update(data, 'utf8').digest('hex');
}


