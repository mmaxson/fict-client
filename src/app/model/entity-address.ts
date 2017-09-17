import {AddressType} from './address-type';
import {Address} from './address';

export class EntityAddress {

  public legalEntityId: number;
  public entityAddressId: number;
  public addressType: AddressType;
  public address: Address;

  constructor( legalEntityId: number, entityAddressId?: number, addressType?: AddressType, address?: Address) {
    this.legalEntityId = legalEntityId;
    this.entityAddressId = (entityAddressId) ? entityAddressId : 0;
    this.addressType = (addressType) ? addressType : new AddressType();
    this.address = (address) ? address : new Address();
  }
}

