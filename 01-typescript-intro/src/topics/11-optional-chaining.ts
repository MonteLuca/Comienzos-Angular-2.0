export interface Passenger {
    name: string;
    children?: string[];
}

const passenger1: Passenger = {
    name: 'Luca'
}

const passenger2: Passenger = {
    name: 'Fernando',
    children: ['Natalia', 'Elizabeth', 'Maria']
}

const printChildren = ( passenger: Passenger) => {

    //Le decimos si tiene children que me devuelva el lenght y si es "undefined" tome el valor de 0
    const howManyChildren = passenger.children?.length || 0;

    console.log( passenger.name, howManyChildren );
}

printChildren( passenger1 )
printChildren( passenger2 )