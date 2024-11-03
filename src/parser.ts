import os from 'node:os';

export const getCurrentDateTime = (timestamp?: number): string =>
  new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(timestamp ? new Date(timestamp) : new Date());

export const startedAt = (): string =>
  new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(Date.now() - os.uptime() * 1000));

export const getUptime = (): string => formatUptime(process.uptime());

export const getOSUptimeDuration = (): string => {
  const now = new Date();
  const startedAt = new Date(Date.now() - os.uptime() * 1000);
  const diff = now.getTime() - startedAt.getTime();
  return formatUptime(diff / 1000);
};

export const formatUptime = (uptime: number): string => {
  const days = Math.floor(uptime / (24 * 3600));
  const hours = Math.floor((uptime % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
