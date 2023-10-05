interface AudioPlayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: AudioPlayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Like a Stone",
    details: {
        author: 'Audioslave',
        year: 2004
    }
}

/* Para desestructurar los objetos lo hacemos de la siguiente manera
Esto tomara el song del abjeto audioPlayer, es como si hubiese una constante "song" con el valor de la propiedad de
"audioplayer.song" */
// const { song } = audioPlayer;

/* Pero si tengo otra constante con el mismo nombre podemos darle un nombre a la variable para que
no haya choques entre constantes */

// const { song: anotherSong,
//         songDuration: duration,  
//         details: { author } } = audioPlayer;

const { song: anotherSong, songDuration: duration, details } = audioPlayer;
const { author } = details;

/* Ahora en vez de llamar a song, llamamos a anotherSong que toma el valor de la propiedad song del objeto */

// console.log('Song: ' , anotherSong);
// console.log('Duration: ' , duration);
// console.log('Author: ' , author);

// const dbz: string[] = ['Goku','Vegeta','Trunks'];
// Vamos a desestructurar un arreglo
//Es igual que la desestructuracion de objetos excepto que en vez de {} se usa []
const [, , trunks = 'Not found ']: string[] = ['Goku','Vegeta','Trunks'];

console.log('Personaje 3: ', trunks);

export {}