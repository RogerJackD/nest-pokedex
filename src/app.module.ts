import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';

import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'),
      renderPath : '/'
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    PokemonModule
  ],
})
export class AppModule {}
