import Fastify from 'fastify';
import votesRoutes from './routes/vote.routes';
import cors from '@fastify/cors';

async function buildFastify() {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors, {
    origin: ['http://127.0.0.1:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  await fastify.register(votesRoutes);

  return fastify;
}

export const start = async () => {
  const fastify = await buildFastify();
  try {
    fastify.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};