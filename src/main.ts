import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //limpia la data innecesaria del request
      forbidNonWhitelisted: true, //habilita las reglas establecitas de nuestro DTO
    })
  )

  app.setGlobalPrefix('api/v2')

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
