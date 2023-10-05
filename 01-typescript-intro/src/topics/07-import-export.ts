import { Products, taxCalculation } from "./06-function-desestructuring";   

const shoppingCart: Products[] = [
    {
        desc: 'Nokia',
        price: 100
    },
    {
        desc: 'iPad',
        price: 200
    }
];

const [total , tax] = taxCalculation({
    products: shoppingCart,
    tax: 0.15
})

console.log('Total', total);
console.log('Tax', tax);