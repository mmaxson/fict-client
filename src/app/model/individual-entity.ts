export class IndividualEntity {
  public first: string;
  public middle: string;
  public last: string;
  public addressType: string;
  public street: string;
  public city: string;
  public state: string;
  public zipCode: string;

  constructor(first: string, middle: string, last: string, addressType: string, street: string, city: string, state: string, zipCode: string) {

    this.first = (first) ? first : '';
    this.middle = (middle) ? middle : '';
    this.last = (last) ? last : '';
    this.addressType = addressType;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
  }





}
