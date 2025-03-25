// netlify/functions/submit-form.js

export default async (req, context) => {
    const allowedOrigins = [
      'https://davids-marvelous-site-9bec45.webflow.io', // ✅ your Webflow staging domain
      'https://your-production-domain.com' // 🔁 Add your real domain here when ready
    ];
  
    const origin = req.headers.origin;
    const isAllowedOrigin = allowedOrigins.includes(origin);
  
    if (req.method === 'OPTIONS') {
      // Handle preflight
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '86400'
        }
      });
    }
  
    try {
      const body = await req.json();
  
      const response = await fetch('https://hooks.zapier.com/hooks/catch/18173094/2ewoizp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
  
      const responseText = await response.text();
  
      return new Response(responseText, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '*',
          'Content-Type': 'text/plain'
        }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Something went wrong.' }), {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': isAllowedOrigin ? origin : '*',
          'Content-Type': 'application/json'
        }
      });
    }
  };
  