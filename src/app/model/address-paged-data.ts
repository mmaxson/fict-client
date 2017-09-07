import {AddressPage} from './address-page';

/**
 * An array of data with an associated page object used for paging
 */
export class AddressPagedData<T> {
  data = new Array<T>();
  page = new AddressPage();
}
