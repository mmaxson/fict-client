
export class Address {

  public addressId: number;
  public street: string;
  public city: string;
  public state: string;
  public zipCode: string;

  constructor( addressId?: number, street?: string, city?: string, state?: string, zipCode?: string ) {
    this.addressId = (addressId) ? addressId : 0;
    this.street = (street) ? street : '';
    this.city = (city) ? city : '';
    this.state = (state) ? state : ' ';
    this.zipCode = (zipCode) ? zipCode : '';
  }
}

