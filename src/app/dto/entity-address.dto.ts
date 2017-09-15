import {Address} from '../model/address';


export class EntityAddressDTO {

  constructor( public entityAddressId: number, public addressTypeId: number, public address: Address, public legalEntityId: number ) {
  }
}

