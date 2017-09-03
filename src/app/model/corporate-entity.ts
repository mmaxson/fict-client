export class CorporateEntity {
  public corporationName: string;
  public addressType: string;
  public street: string;
  public city: string;
  public state: string;
  public zipCode: string;

  constructor(corporationName: string, addressType: string, street: string, city: string, state: string, zipCode: string) {
    this.corporationName = corporationName;
    this.addressType = addressType;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;

    console.log(this.corporationName + ' naaaaa');
  }




}
