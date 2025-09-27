import type { NextApiRequest, NextApiResponse } from 'next'

const BASE = 'http://ec2-43-205-101-85.ap-south-1.compute.amazonaws.com:8400'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const username = req.query.username as string
    const url = `${BASE}/api/user/resend-confirmation-code?username=${encodeURIComponent(username ?? '')}`
    const r = await fetch(url, { method: 'POST', headers: { accept: 'application/json' } })
    const data = await r.json()
    return res.status(r.status).json(data)
  } catch {
    return res.status(500).json({ message: 'Something went wrong' })
  }
}
