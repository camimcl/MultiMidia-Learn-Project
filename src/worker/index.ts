import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>();

// Enable CORS for all routes
app.use('/*', cors());

// Audio proxy endpoint to serve Google Drive files with correct CORS headers
app.get('/api/audio-proxy/:fileId', async (c) => {
  const fileId = c.req.param('fileId');
  
  try {
    const driveUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
    const response = await fetch(driveUrl);
    
    if (!response.ok) {
      return c.json({ error: 'Failed to fetch audio file' }, 500);
    }

    const audioData = await response.arrayBuffer();
    
    return new Response(audioData, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error proxying audio:', error);
    return c.json({ error: 'Failed to proxy audio file' }, 500);
  }
});

export default app;
