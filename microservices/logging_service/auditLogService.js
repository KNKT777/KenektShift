
    import fs from 'fs';
    import path from 'path';

    const logDirectory = path.join(__dirname, '../../logs');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    export const logDataAccess = (userId, action, dataId, description) => {
      const logMessage = {
        timestamp: new Date().toISOString(),
        userId,
        action,
        dataId,
        description,
      };

      fs.appendFile(
        path.join(logDirectory, 'audit.log'),
        JSON.stringify(logMessage) + '\n',
        (err) => {
          if (err) {
            console.error('Failed to write to audit log', err);
          }
        }
      );
    };
    
        export const logSensitiveAction = (userId, action, dataId, description) => {
          const logMessage = {
            timestamp: new Date().toISOString(),
            userId,
            action,
            dataId,
            description,
            sensitive: true,
          };

          fs.appendFile(
            path.join(logDirectory, 'sensitive_audit.log'),
            JSON.stringify(logMessage) + '\n',
            (err) => {
              if (err) {
                console.error('Failed to write to sensitive audit log', err);
              }
            }
          );
        };
        