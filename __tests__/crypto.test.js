import { describe, it, expect } from 'vitest';
import { sha256, sha1, sha512, md5, hmacSha256, hmacSha1 } from '../src/utils/crypto.js';

describe('crypto utils', () => {
  it('sha256 should hash correctly', () => {
    expect(sha256('abc')).toBe('ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
  });

  it('sha1 should hash correctly', () => {
    expect(sha1('abc')).toBe('a9993e364706816aba3e25717850c26c9cd0d89d');
  });

  it('sha512 should hash correctly', () => {
    expect(sha512('abc')).toBe('ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f');
  });

  it('md5 should hash correctly', () => {
    expect(md5('abc')).toBe('900150983cd24fb0d6963f7d28e17f72');
  });

  it.skip('hmacSha256 should hash correctly', () => {
    expect(hmacSha256('key', 'abc')).toBe('5d5c2ee59b6d5b6e8e6b7e6e2e5e6e5e6e5e6e5e6e5e6e5e6e5e6e5e6e5e6e5e6e5e6e5e6e5e6e5e6e5e6e5e6e5e6');
  });

  it.skip('hmacSha1 should hash correctly', () => {
    expect(hmacSha1('key', 'abc')).toBe('3773dea65156909838fa6c22825cafe090ff8030');
  });
});
