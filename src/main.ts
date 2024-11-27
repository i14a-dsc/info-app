import { getDeviceStatus, getUser } from './device.js';
import { getCurrentDateTime, getOSUptimeDuration, getUptime, startedAt } from './parser.js';
import { battery } from 'systeminformation';

(async () => {
  const argv = process.argv.slice(2);
  if (argv.includes('--help') || argv.includes('-h')) {
    console.log(
      [
        `Usage: node main.js [--once|-o] [--autokill|-A] [--help|-h]`,
        `--autokill and --once cannot be used at the same time.`,
        'press q and enter to quit.',
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
    process.stdin.on('data', chunk => {
      const input = chunk.toString();
      if (input.trim() === 'q') {
        console.log('Quit');
        process.exit();
      }
    });
  }, 3000);
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
    'Battery: ' + (await battery()).percent + '%',
  ];
}
