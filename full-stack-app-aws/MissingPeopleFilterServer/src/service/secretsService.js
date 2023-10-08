import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from "@aws-sdk/client-secrets-manager";
import dotenv from 'dotenv'


dotenv.config()

// const client = new SecretsManagerClient({
//   credentials: {
//     accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
//     secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
//   },
//   region: process.env["AWS_REGION"],
// });

const client = new SecretsManagerClient({
  credentials: {
        accessKeyId: process.env['AWS_ACCESS_KEY_ID'],
        secretAccessKey: process.env['AWS_SECRET_ACCESS_KEY'],
  },
  region: process.env["AWS_REGION"]
});

class SecretsService {
  async getSecret(secretName) {
    try{

      const response = await client.send(
        new GetSecretValueCommand({
          SecretId: secretName,
          VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
      );

      return response.SecretString;

    } catch(e){
      console.error('Get secret error', e)
    }
  }





// Your code goes here

}

export default new SecretsService();