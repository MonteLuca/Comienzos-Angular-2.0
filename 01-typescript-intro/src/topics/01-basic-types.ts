//Si sabemos que la variable no va a cambiar durante todo el transcurso del codigo
//le decimos que va a ser "const", en caso contrario es "let"     
const name: string = 'Strider';

// let hpPoints: number = 95;

//Tambien podemos decir que la variable puede tener 2 tipo de datos: "string" o "number"
//Para eso lo hacemos de la siguiente manera

// let hpPoints: number | string = 95;
// hpPoints = 'Hola Mundo'

//Ahora si yo quisiera cambiar el valor por un "string" me dejaria perfectamente, pero si es un caso
//muy particular para asignarle un "string" a un "number" podemos directamente decirle que palabra 
//deberia recibir y solamente esa seria valida, cualquier otro "string" es invalido. 

let hpPoints: number | 'FULL' = 95;

hpPoints = 'FULL';

const isAlive: boolean = true;

console.log({
    name,hpPoints,isAlive
});

export {};