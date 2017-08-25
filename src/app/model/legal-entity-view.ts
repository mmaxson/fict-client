export class LegalEntityView {
  public name: string;
  public addressType: string;
  public street: string;
  public city: string;
  public state: string;
  public zipCode: string;

  constructor(name: string, addressType: string, street: string, city: string, state: string, zipCode: string) {
    this.name = name;
    this.addressType = addressType;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
  }




}
