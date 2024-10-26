import 'winston-daily-rotate-file';

// Correctly declare and define the logger variable
const logger = createLogger({
  level: \'info\',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      filename: \'logs/combined-%DATE%.log\',
      datePattern: \'YYYY-MM-DD\',
      zippedArchive: true,
      maxSize: \'20m\',
      maxFiles: \'14d\'
    }),
    new transports.DailyRotateFile({
      level: \'error\',
      filename: \'logs/error-%DATE%.log\',
      datePattern: \'YYYY-MM-DD\',
      zippedArchive: true,
      maxSize: \'20m\',
      maxFiles: \'14d\'
    })
  ],
});

console.log('Logger initialized successfully');

// Export the logger correctly
export default logger;
