import serverless from 'serverless-http';
import app from '../../server';

// Ensure the Express app receives the correct URL path
const handler = serverless(app);

export const handlerFunction = async (event, context) => {
  if (event.path && !event.path.startsWith('/api')) {
    event.path = '/api' + (event.path === '/' ? '' : event.path);
  }
  return await handler(event, context);
};

export { handlerFunction as handler };
