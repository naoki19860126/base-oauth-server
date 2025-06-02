export default async function handler(req, res) {
  const code = req.query.code;

  if (!code) {
    return res.status(400).send('Missing code parameter');
  }

  const clientId = '205187e3be67e9dbf3da4969082911c4';
  const clientSecret = 'b9ef6a7b7876a1703a434012ac24f5f0';
  const redirectUri = 'https://base-oauth-server.vercel.app/api/callback';

  const tokenResponse = await fetch('https://api.thebase.in/1/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri
    })
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    return res.status(400).json(tokenData); // エラー詳細表示
  }

  return res.status(200).send(`アクセストークン: ${tokenData.access_token}`);
}
