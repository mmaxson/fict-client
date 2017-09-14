import {AddressType} from './address-type';
import {Address} from './address';

export class EntityAddress {

  constructor( public entityAddressId: number, public addressType: AddressType, public address: Address, public legalEntityId: number ) {
  }
}

