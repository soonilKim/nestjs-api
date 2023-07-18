import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3030; // 원하는 포트 번호 (예: 5000)

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
