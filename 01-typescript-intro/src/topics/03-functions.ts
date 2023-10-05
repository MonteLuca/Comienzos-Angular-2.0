/* Para indicar de que tipo van a ser los parametros de la funcion lo hacemos de la siguiente manera. 
Despues de los parentesis se indicar el tipo de dato que esta funcion va a retornar */ 
function addNumbers( a: number, b: number ): number {
    return a + b;
}

const addNumbersArrow = (a:number , b: number): string => {
    return `${a + b}`;
}

//Para indicar que un parametro es opcional le agregamos al final el "?".
//Y para indicar el valor por defecto de un parametro lo hacemos de la siguiente manera "base: number = 2"
//aqui decimos que si el parametro de base no viene por defecto es 2, si no toma el valor que le mandemos
function multiply(firstNumber: number, secondNumber?: number, base: number = 2) {
    return firstNumber * base;
}

// const result: number = addNumbers(1, 4);

// const result2: string = addNumbersArrow(1,4);

// const multiplyResult: number = multiply(5);

// console.log({
//     result, result2, multiplyResult
// });

interface Character {
    name: string;
    hp: number;
    showHp: () => void;
}

const healCharacter = ( character: Character , amount: number ) => {

    character.hp += amount;

}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`Puntos de vida ${ this.hp }`);
    }
}

healCharacter(strider, 10);

strider.showHp();

export {}