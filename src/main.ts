import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  app.enableCors();

  await app.listen(port, () =>
    console.log('Server running at http://localhost:%s', port),
  );
}
bootstrap();
