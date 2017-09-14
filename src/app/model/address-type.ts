export class AddressType {

  constructor( public addressTypeId: number, public addressTypeText: string) {
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

