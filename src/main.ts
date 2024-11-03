import { getDeviceStatus, getUser } from './device.js';
import { getCurrentDateTime, getOSUptimeDuration, getUptime, startedAt } from './parser.js';

setInterval(async () => {
  const log = await generateConsoleText();
  console.clear();
  console.log(log.join('\n'));
}, 1000);

async function generateConsoleText(): Promise<string[]> {
  const now = getCurrentDateTime();

  const { memoryUsage } = await getDeviceStatus();

  return [
    'Hi, ' + getUser() + '. It is ' + now,
    'Process uptime: ' + getUptime(),
    'OS started at: ' + startedAt(),
    'OS uptime duration: ' + getOSUptimeDuration(),
    'Memory usage: ' + memoryUsage,
  ];
}
