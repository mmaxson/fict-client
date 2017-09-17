export class AddressType {

  public addressTypeId: number;
  public addressTypeText: string;

  constructor( addressTypeId?: number, addressTypeText?: string) {
    this.addressTypeId = (addressTypeId) ? addressTypeId : 0;
    this.addressTypeText = (addressTypeText) ? addressTypeText : '';
  }

  public static getAddressTypeText( id: number, addressTypes: Array<AddressType> ): string {
    for( const i of addressTypes){
      if ( i.addressTypeId === id ) {
        return i.addressTypeText;
      }
    }
    return 'address type text not found.';
  }
}

