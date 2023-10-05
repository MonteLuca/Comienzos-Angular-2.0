const skills: string[] = ['Bash','Counter','Healing'];

//Para definir de que tipo de dato son los atributos de un objeto JSON, usamos una "interface"
//Ya que "interface" cuando se compila a JavaScript no se compila, es equivalente a 0 lineas de codigo

interface Character {
    name: string;
    hp: number;
    skills: string[];
    hometown?: string;
}

//Y ahora le decimos que "Strider" es de tipo "Character"
//Si alguna propiedad es opcional, es decir, que puede o no estar en el objeto del cual estamos manipulando
//en la "interface Character {}", vamos a la propiedad y le ponemos un "?" al final, de este modo, le estamos diciendo
//que tal propiedad puede o no estar presente

const strider: Character = {
    name: 'Strider',
    hp: 100,
    skills: ['Bash','Counter', 'Healing']
}

//Si en algun momento del codigo en este caso "strider" tiene un "hometown" se lo asignamos de la siguiente manera
strider.hometown = 'Rivendell'

console.table(strider);

export {}