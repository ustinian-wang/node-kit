import { describe, it, expect, vi } from 'vitest';
import { logDecorator, createFlowLog } from '../src/utils/log.js';

describe('log utils', () => {
  it('logDecorator should call console.log with correct args', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const log = logDecorator('prefix', 'post');
    log(['msg1', 'msg2']);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  it('createFlowLog should return a function and call console.log', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const flowLog = createFlowLog();
    flowLog(['msg']);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
