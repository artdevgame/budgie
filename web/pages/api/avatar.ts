import type { NextApiRequest, NextApiResponse } from 'next';
const https = require('https');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // avoid cors error by streaming url
  const { url } = req.query;

  if (typeof url !== 'string') {
    return res.status(400).json({ message: 'Missing url in query params' });
  }

  await new Promise((resolve) => {
    https.get(url, (stream) => {
      stream.pipe(res);
      stream.on('end', resolve);
    });
  });
};
