import "reflect-metadata";
import { HttpStatus, INestApplication } from "@nestjs/common";

import type { EntityManager, IDatabaseDriver, Connection, MikroORM } from "@mikro-orm/core";

import { faker } from "@faker-js/faker";
import request from "supertest";

import { EUserRole } from "@/common/enums/roles.enums";
import { RegisterUserDto } from "@/users/users.dtos";

import { bootstrapTestServer } from "../utils/bootstrap";
import { truncateTables } from "../utils/db";
import { THttpServer } from "../utils/types";
import { seedPermissionsData } from "./users.helpers";

describe("UsersController (e2e)", () => {
  let app: INestApplication;
  let dbService: EntityManager<IDatabaseDriver<Connection>>;
  let httpServer: THttpServer;
  let orm: MikroORM<IDatabaseDriver<Connection>>;

  beforeAll(async () => {
    const { appInstance, dbServiceInstance, httpServerInstance, ormInstance } =
      await bootstrapTestServer();
    app = appInstance;
    dbService = dbServiceInstance;
    httpServer = httpServerInstance;
    orm = ormInstance;
    await seedPermissionsData(dbService);
  });

  afterAll(async () => {
    await truncateTables(dbService);
    await orm.close();
    await httpServer.close();
    await app.close();
  });

  afterEach(() => {
    dbService.clear();
  });

  describe("POST /users", () => {
    it("returns CREATED(201) after creating a new user", () => {
      const newUserRegistrationDto: RegisterUserDto = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        profileInput: {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
        },
      };

      return request(httpServer)
        .post("/users")
        .send(newUserRegistrationDto)
        .expect(HttpStatus.CREATED)
        .expect((response) => {
          expect(response.body.data).toEqual({
            id: expect.any(Number),
            email: newUserRegistrationDto.email,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            userProfile: {
              id: expect.any(Number),
              createdAt: expect.any(String),
              updatedAt: expect.any(String),
              firstName: newUserRegistrationDto.profileInput.firstName,
              lastName: newUserRegistrationDto.profileInput.lastName,
              email: newUserRegistrationDto.email,
              role: {
                id: expect.any(Number),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                name: EUserRole.ADMIN,
              },
            },
          });
        });
    });

    it("returns BAD_REQUEST(400) if dto is invalid", () => {
      const newUserRegistrationDto: RegisterUserDto = {
        email: "invalid-email",
        password: "short",
        profileInput: {
          firstName: "",
          lastName: "",
        },
      };

      return request(httpServer)
        .post("/users")
        .send(newUserRegistrationDto)
        .expect(HttpStatus.BAD_REQUEST)
        .expect((response) => {
          expect(response.body.message).toEqual([
            "email must be an email",
            "password must be longer than or equal to 8 characters",
            "profileInput.firstName must be longer than or equal to 2 characters",
            "profileInput.lastName must be longer than or equal to 2 characters",
          ]);
        });
    });
  });
});
