import type { NextApiRequest, NextApiResponse } from 'next'

const BASE = 'http://ec2-43-205-101-85.ap-south-1.compute.amazonaws.com:8400'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const r = await fetch(`${BASE}/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify(req.body),
    })
    const data = await r.json()
    return res.status(r.status).json(data)
  } catch (e) {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}
