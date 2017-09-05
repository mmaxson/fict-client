export class TableColumnToDataColumnMap {
  public tableColumnTitle: string;
  public dataColumn: string;

  constructor ( tableColumnTitle: string, dataColumn: string ) {
    this.tableColumnTitle = tableColumnTitle;
    this.dataColumn = dataColumn;
  }
}
