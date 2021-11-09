export class Product {

  constructor(
    public id?: string,
    // @ts-ignore
    public name: string,
    public category?: string,
    public description?: string,
    public price?: number) { }
}
