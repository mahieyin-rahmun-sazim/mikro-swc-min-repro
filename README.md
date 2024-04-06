### Steps

- Run `nvm use`
- Run `yarn`
- Spin up database using `docker run -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=project_dev_db -p 5442:5432 --name project_dev_db -d postgres:14`
- Run `yarn db:migration:fresh:dev`
- Run `yarn start:dev`
- Observe that everything works fine (e.g. using Postman)
- Run `yarn db:migration:fresh:test`
- Run `yarn test:e2e`
- Observe the error: 
```sh
TypeError: (0 , _core.wrap)(...).assign is not a function
    at UsersRepository.assign (/mnt/c27bdc82-e77d-4698-b87b-1b89088fbc88/code/sazim-internal/sandbox/mikro-swc-min-repro/src/users/users.repository.ts:30:23)
    at UsersService.create (/mnt/c27bdc82-e77d-4698-b87b-1b89088fbc88/code/sazim-internal/sandbox/mikro-swc-min-repro/src/users/users.service.ts:35:48)
    at UsersController.create (/mnt/c27bdc82-e77d-4698-b87b-1b89088fbc88/code/sazim-internal/sandbox/mikro-swc-min-repro/src/users/users.controller.ts:19:21)
```
