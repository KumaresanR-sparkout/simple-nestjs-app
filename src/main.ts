import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '../utils/exception_filter';
import helmet from "helmet";
import { json, urlencoded } from "express";

const PORT: number = <number>(process.env?.PORT ?? 3000);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Enable cors option
  app.enableCors(
    {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      preflightContinue: false,
      optionsSuccessStatus: 204
    }
  )

  app.use(json({ limit: "50mb" }));
  app.use(urlencoded({ extended: true }))
  app.use(helmet());
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT, () => {
    console.log(`Server started at 🚀 http://localhost:${PORT}`)
  });
}

bootstrap();
