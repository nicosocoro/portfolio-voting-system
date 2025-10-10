import Fastify from 'fastify';
import votesRoutes from './routes/vote.routes';

async function buildFastify() {
  const fastify = Fastify({ logger: true });
  await fastify.register(votesRoutes);

  fastify.get('/dummy', async (request, reply) => {
    return { message: 'Hello from dummy endpoint!' };
  });
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