import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import config from 'config';
const credentials =  config.get('credentials')
const awsCredentials: any = {
  region: config.get('REGION')!,
  credentials: credentials,
};
const client = new S3Client(awsCredentials);

const streamToString = (stream): Promise<string> => new Promise((resolve, reject) => {
  const chunks: Buffer[] = []
  stream.on('data', (chunk:any) => chunks.push(chunk));
  stream.on('error', reject);
  stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
});

export const getS3Object = (bucket:string, key:string) => {
  const params = {
    Bucket: bucket,
    Key: key
  };
  const command = new GetObjectCommand(params);
  return client.send(command)
    .then((response: any) => {
      const stream = response.Body as Readable;
      return streamToString(stream).then((result: string) => {
        return JSON.parse(result);
      });
    });
}

export const saveS3Object = (bucket:string, key:string, data:any) => {
  const params = {
    Bucket: bucket,
    Key: key,
    Body: JSON.stringify(data),
    ContentType: 'application/json',
  };
  const command = new PutObjectCommand(params);
  return client.send(command);
}