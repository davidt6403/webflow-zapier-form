exports.handler = async function (event, context) {
    // ✅ Handle preflight request for CORS
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // You can replace * with your domain
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
        },
        body: 'OK',
      };
    }
  
    // ✅ Handle actual POST request
    if (event.httpMethod === 'POST') {
      try {
        const data = JSON.parse(event.body);
  
        // 🔄 Replace with your actual Zapier webhook
        const zapierWebhook = 'https://hooks.zapier.com/hooks/catch/18173094/2ewoizp/';
  
        const response = await fetch(zapierWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
  
        const text = await response.text();
  
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ success: true, zapierResponse: text }),
        };
      } catch (error) {
        console.error('❌ Server Error:', error);
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({ success: false, error: error.message }),
        };
      }
    }
  
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'Method Not Allowed',
    };
  };
  