
type ProductId = number;
enum Gender  { 
    Male='Male',
    Women ='Women'
}
enum Currency { 
    INR='INR'
}
export interface Product {
    color: string
    currency: Currency
    gender: Gender
    id: ProductId
    imageURL: string
    name: string
    price: number
    quantity: number
    type: string,
}
export type CategoryKey  = keyof Product;

export type Category = Partial<{ [K in CategoryKey] : {
    name :string,
    key:keyof Product,
    list:Set<string | number>
    extraCategories?: { min :number, max:number, label :string}[]
}}>
export type FilterInfo = { name: string; filterBy: CategoryKey };
export type Filter = Partial<{ [ key in CategoryKey]: Set<string | number> }>;
