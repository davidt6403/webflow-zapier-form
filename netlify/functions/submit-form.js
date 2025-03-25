export async function handler(event, context) {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ message: "Method Not Allowed" }),
      };
    }
  
    try {
      const data = JSON.parse(event.body);
      const response = await fetch("https://hooks.zapier.com/hooks/catch/18173094/2ewoizp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit to Zapier");
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Success" }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Error", error: error.message }),
      };
    }
  }
  