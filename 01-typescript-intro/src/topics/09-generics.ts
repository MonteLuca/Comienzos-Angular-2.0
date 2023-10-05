export function whatsMyType<T>( argument: T ): T {
    return argument
}

//Por defecto no hace falta indiciar el tipo de dato ya que infiere cual es, pero se puede hacer perfectamente

// const amIString = whatsMyType('Hola mundo');
// const amINumber = whatsMyType(100);
// const amIArray = whatsMyType([1,2,3,4,5]);

const amIString = whatsMyType<string>('Hola mundo');
const amINumber = whatsMyType<number>(100);
const amIArray = whatsMyType<number[]>([1,2,3,4,5]);

console.log(amIString.split(' '));
console.log(amINumber);
console.log(amIArray);
