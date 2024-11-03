import osu from 'node-os-utils';
import os from 'node:os';

export const getDeviceStatus = async (): Promise<{
  memoryUsage: string;
}> => {
  const memoryUsage = Math.trunc(((await osu.mem.used()).usedMemMb / 1024) * 100) / 100 + 'GB';
  return { memoryUsage };
};

export function getUser() {
  const host = os.hostname();
  const user = os.userInfo().username;

  return `${user}@${host}`;
}
