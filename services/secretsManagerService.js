
    import AWS from 'aws-sdk';

    const secretsManager = new AWS.SecretsManager({
      region: process.env.AWS_REGION
    });

    export const getSecret = async (secretName) => {
      try {
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
        if ('SecretString' in data) {
          return JSON.parse(data.SecretString);
        }
        throw new Error('Secret not found');
      } catch (err) {
        console.error('Error retrieving secret:', err);
        throw err;
      }
    };
    