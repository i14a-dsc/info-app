import { getDeviceStatus, getUser } from './device.js';
import { getCurrentDateTime, getOSUptimeDuration, getUptime, startedAt } from './parser.js';
(async () => {
  const argv = process.argv.slice(2);
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(
      [
        `Usage: node main.js [--once] [--autokill] [--help]`,
        `--autokill and --once cannot be used at the same time.`,
      ].join('\n')
    );
    process.exit(0);
  }
  if (argv.includes('--once') || argv.includes('-o')) {
    const log = await generateConsoleText();
    console.log(log.join('\n'));
    process.exit(0);
  }
  if (argv.includes('--autokill') || argv.includes('-A')) {
    setInterval(() => process.exit(0), 12 * 60 * 60 * 1000);
  }

  setInterval(async () => {
    const log = await generateConsoleText();
    console.clear();
    console.log(log.join('\n'));
  }, 1000);
})();
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
