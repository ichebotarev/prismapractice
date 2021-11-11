import { ApolloServer } from 'apollo-server-micro';
import { schema } from '../../graphql/schema';
import { createContext } from '../../graphql/context';




const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const Cors = require('micro-cors')
const cors = Cors({
	allowHeaders: ['Access-Control-Allow-Origin', 'Authorization', 'Content-Type'],
	allowMethods: ['GET', 'POST', 'OPTIONS'],
	origin:
		process.env.NODE_ENV === 'production' ? 'https://prismapractice.vercel.app/' : 'http://localhost:3000'
})
module.exports = cors((req, res) =>
	req.method === 'OPTIONS'
		? // Preflight response needs to be sent back as okay
		//@ts-ignore  
    send(res, 200)
		: apolloServer.createHandler({ path: '/api/graphql' })(req, res)
)