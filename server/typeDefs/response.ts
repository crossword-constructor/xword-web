import { Field, InterfaceType, } from 'type-graphql'

@InterfaceType()
export abstract class QueryResponse {
  @Field()
  code!: string;

  @Field()
  success!: boolean;

  @Field()
  message!: string;
}

@InterfaceType()
export abstract class MutationResponse {
  @Field()
  code!: string;

  @Field()
  success!: boolean;

  @Field()
  message!: string;
}
