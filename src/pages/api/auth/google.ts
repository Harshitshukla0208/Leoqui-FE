import type { NextApiRequest, NextApiResponse } from 'next'

const BASE = 'http://ec2-43-205-101-85.ap-south-1.compute.amazonaws.com:8400'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { code } = req.body || {}
    const url = `${BASE}/api/user/google?code=${encodeURIComponent(code ?? '')}`
    const r = await fetch(url, { method: 'POST', headers: { accept: 'application/json' } })
    const data = await r.json()
    return res.status(r.status).json(data)
  } catch {
    return res.status(500).json({ message: 'Google authentication failed' })
  }
}
