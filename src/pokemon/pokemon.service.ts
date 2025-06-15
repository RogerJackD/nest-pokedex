import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {
  
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create( createPokemonDto )
      return pokemon;
      
    } catch (error) {
      if( error.code === 11000){
        throw new BadRequestException(`Pokemon exist in DB ${ JSON.stringify( error.keyValue )}`)
      }
      console.log('error is: -' +error)
      throw new InternalServerErrorException(`Cant create pokemon - check server logs`)
    }

    
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {

    let pokemon: Pokemon | null = null;

    if( !isNaN(+term) ){
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    //mongoID
    if ( !pokemon && isValidObjectId( term ) ) {  ///isValidObjectId function that also checks if is mongo id
      pokemon = await this.pokemonModel.findById( term )
    }
    
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name : term.toLowerCase().trim() })
    }

    if( !pokemon ){
      throw new NotFoundException(`Pokemon with id, name or no ' ${term} ' not found`)
    }


    return pokemon
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term) ; //use logic of method get for get object pokemon 

    if ( updatePokemonDto.name )
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase(); //validate only lowercase name property 

    await pokemon.updateOne( updatePokemonDto );

    return { ...pokemon.toJSON(), ...updatePokemonDto }; //to get the pokemon updated
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
