export class Query {
  private _keywords: string;
  private _genes: string;
  private _mutations: string;

  public get keywords(): string {
    return this._keywords;
  }

  public set keywords(value: string) {
    this._keywords = value;
  }

  public get genes(): string {
    return this._genes;
  }

  public set genes(value: string) {
    this._genes = value;
  }

  public get mutations(): string {
    return this._mutations;
  }

  public set mutations(value: string) {
    this._mutations = value;
  }
}
