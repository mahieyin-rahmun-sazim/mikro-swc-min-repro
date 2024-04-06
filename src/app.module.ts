import { Logger, MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { MikroOrmMiddleware, MikroOrmModule } from "@mikro-orm/nestjs";

import { validate } from "./common/validators/env.validator";
import ormConfig from "./db/db.config";
import { RolesModule } from "./roles/roles.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      isGlobal: true,
      validate,
    }),

    MikroOrmModule.forRoot(ormConfig),

    UsersModule,
    RolesModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(MikroOrmMiddleware).forRoutes("*");
  }
}
