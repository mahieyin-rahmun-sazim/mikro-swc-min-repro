import { ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";

import { MikroORM } from "@mikro-orm/core";

import { AppModule } from "@/app.module";

export const bootstrapTestServer = async () => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const httpServer = app.getHttpServer();
  await app.init();

  const orm = app.get<MikroORM>(MikroORM);
  const entityManager = orm.em.fork();

  return {
    appInstance: app,
    httpServerInstance: httpServer,
    dbServiceInstance: entityManager,
    ormInstance: orm,
  };
};
