import { describe, it, expect } from 'vitest';
import { httpGet, httpPost, httpPut, httpDel } from '../src/utils/http.js';

describe.skip('http utils', () => {
  it('httpGet should fetch data from a public API', async () => {
    const res = await httpGet({ url: 'https://jsonplaceholder.typicode.com/todos/1' });
    expect(res).toContain('userId');
  });

  it('httpPost should post data to a public API', async () => {
    const res = await httpPost({
      url: 'https://jsonplaceholder.typicode.com/posts',
      body: { title: 'foo', body: 'bar', userId: 1 }
    });
    expect(res).toContain('userId');
  });

  // 你可以补充 httpPut、httpDel 的测试，方式类似
});
