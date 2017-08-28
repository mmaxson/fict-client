export class IndividualEntity {
  public firstName: string;
  public middleName: string;
  public lastName: string;
  public addressType: string;
  public street: string;
  public city: string;
  public state: string;
  public zipCode: string;

  constructor(firstName: string, middleName: string, lastName: string, addressType: string, street: string, city: string, state: string, zipCode: string) {

    this.firstName = (firstName) ? firstName : '';
    this.middleName = (middleName) ? middleName : '';
    this.lastName = (lastName) ? lastName : '';
    this.addressType = addressType;
    this.street = street;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
  }

}
