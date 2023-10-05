export interface Products {
    desc: string;
    price: number;
}

const phone: Products = {
    desc: 'Nokia A1',
    price: 150.0
}

const tablet: Products = {
    desc: 'iPad Air',
    price: 250.0
}

const shoppingCart = [phone, tablet];
const tax = 0.15;

interface TaxCalculationOptions {
    tax: number;
    products: Products[];
}

export function taxCalculation( options: TaxCalculationOptions ): [number, number] {

    let total = 0;

    options.products.forEach( ({ price }) => {
        total += price;
    });

    return [total, total * options.tax]

}

const [ total , taxResult ] = taxCalculation({
    products: shoppingCart,
    tax: tax
})

// console.log('Total', total);
// console.log('Tax', taxResult);