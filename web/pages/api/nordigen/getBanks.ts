import type { NextApiRequest, NextApiResponse } from 'next';
import gbBanksStub from '../../../stubs/noridgen/gb-banks.json';

const NORDIGEN_URI = 'https://ob.nordigen.com/api/v2';

// todo: create nordigen client and handle refreshing token
// https://ob.nordigen.com/user-secrets/
/*
  {
    access: string;
    access_expires: number;
    refresh: string;
    refresh_expires: string;
  }
  */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const tokensRes = await fetch(`${NORDIGEN_URI}/token/new/`, {
  //   headers: {
  //     accept: 'application/json',
  //     'content-type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     secret_id: process.env.NORDIGEN_SECRET_ID,
  //     secret_key: process.env.NORDIGEN_SECRET_KEY,
  //   }),
  //   method: 'POST',
  // });

  // const { access } = await tokensRes.json();

  // const banksRes = await fetch(`${NORDIGEN_URI}/institutions/?country=gb`, {
  //   headers: {
  //     accept: 'application/json',
  //     authorization: `Bearer ${access}`,
  //   },
  // });

  // const banks = await banksRes.json();

  return res.status(200).json(gbBanksStub);
};
