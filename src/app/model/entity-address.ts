import {AddressType} from './address-type';

export class EntityAddress {

  constructor( public entityAddressId: number, public addressType: AddressType, public street: string, public city: string,
    public state: string, public zipCode: string ) {}

}

