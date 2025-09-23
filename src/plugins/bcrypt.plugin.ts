// plugins/bcrypt.plugin.ts
import fp from 'fastify-plugin';
import bcrypt from 'bcrypt';

const bcryptPlugin = fp(async (fastify) => {
  // Создаем обертку с правильной типизацией
  const bcryptHelpers = {
    hash: (data: string, saltRounds = 10): Promise<string> => 
      bcrypt.hash(data, saltRounds),
    
    compare: (data: string, encrypted: string): Promise<boolean> => 
      bcrypt.compare(data, encrypted),
    
    genSalt: (saltRounds = 10): Promise<string> => 
      bcrypt.genSalt(saltRounds)
  };

  fastify.decorate('bcrypt', bcryptHelpers);
}, {
  name: 'bcrypt'
});

export default bcryptPlugin;

declare module 'fastify' {
  interface FastifyInstance {
    bcrypt: {
      hash: (data: string, saltRounds?: number) => Promise<string>;
      compare: (data: string, encrypted: string) => Promise<boolean>;
      genSalt: (saltRounds?: number) => Promise<string>;
    };
  }
}