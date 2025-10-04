/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request, env, ctx) {
    // You can view your logs in the Observability dashboard
    console.info({ message: 'Hello World Worker received a request!' }); 
    const url = new URL(request.url);
    const href = url.searchParams.get('href');
    const html = String.raw;
    if(!href){
      return new Response(html `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="ts" content="${new Date().toISOString()}">
        <title>WC Info Usage</title>
        <style>
          @import "https://unpkg.com/open-props@1.3.16";
          @import "https://unpkg.com/open-props@1.3.16/normalize.min.css";
          label {
            height: 45px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
          input{
            width: calc(100vw - 150px);
          }
      </style>
      </head>
      <body style=margin:3px>
        <h1>WC Info Usage 2</h1>
      </body>
      </html>
      `, {
        headers: {
          'content-type': 'text/html;charset=UTF-8'
        }
      })
    }else{
      return new Response('Hello World!');
    }
    
  }
};