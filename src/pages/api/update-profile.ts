import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get authorization token from cookies or headers
    const token = req.cookies.access_token || req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ error: 'No authorization token provided' })
    }

    // Accept profile fields from body (JSON) or query (for compatibility)
    const {
      first_name,
      last_name,
      user_type,
      student_name,
      board,
      grade,
      date_of_birth,
      gender,
      phone_no
    } = req.body || req.query

    // Build query string for external API
    const params = new URLSearchParams({
      first_name,
      last_name,
      user_type,
      student_name,
      board,
      grade,
      date_of_birth,
      gender,
      phone_no
    } as Record<string, string>)

    const response = await fetch(
      `http://ec2-43-205-101-85.ap-south-1.compute.amazonaws.com:8400/api/profile/update-profile?${params.toString()}`,
      {
        method: 'PUT',
        headers: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    )

    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json(data)
    }
    return res.status(200).json(data)
  } catch (error) {
    console.error('Update Profile API Error:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update user profile'
    })
  }
}
