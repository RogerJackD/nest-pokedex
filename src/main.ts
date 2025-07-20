import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //limpia la data innecesaria del request
      forbidNonWhitelisted: true, //habilita las reglas establecitas de nuestro DTO
      transform: true, //transforma la informacion que fluye de los dtos
      transformOptions: {
        enableImplicitConversion: true,
      }
    })
  )


  await app.listen(process.env.PORT ?? 3000);

  console.log(`APP running on port ${process.env.PORT}`)
}
bootstrap();
