import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'vengerovdmitrij',
  password: '',
  database: 'dev',
  entities: [__dirname + '/../**/*.js'],
  synchronize: true
}