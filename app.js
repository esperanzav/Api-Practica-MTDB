let pagina = 1;
const btnAnterior= document.getElementById('btnAnterior');
const btnSiguiente= document.getElementById('btnSiguiente');

// vamos a crear el evento al hacer click
btnSiguiente.addEventListener('click',()=>{
    if(pagina <1000){// hacemos la condicion para saber que se va a parar en la pagina 1000
        pagina= pagina + 1;// cuando presiono la pagina 2 se suma y 3 se suma asi sucesivamente

        cargarpeliculas();
    }

})

btnAnterior.addEventListener('click',()=>{
    if(pagina >1){// hacemos la condicion para saber que se va a parar en la pagina 1000
        pagina= pagina - 1;// cuando presiono la pagina 2 se suma y 3 se suma asi sucesivamente

        cargarpeliculas();
    }

})


const cargarpeliculas= async()=>{

try{
    const respuesta=  await  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=861d8611af6ef3b31ea7b536f7ad47b7&language=es-ES&page=${pagina}`)
    console.log(respuesta)

// si la respuesta es correcta ===200
if(respuesta.status ===200){
    const datos= await respuesta.json();//PARA ACCEDER A LA IFNORMACION CON JSON
    //console.log(datos.results)
    
    let peliculas= '';
datos.results.forEach(pelicula => {
   peliculas= peliculas + `
<div class="pelicula">
   <img clas="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
   <h3 class="titulo">${pelicula.title}</h3>
</div> 

   `;
});

document.getElementById('contenedor').innerHTML = peliculas;


}else if(respuesta.status === 401){
    console.log('error, llave mal')
}else if(respuesta.status === 404){
    console.log('la pelicula que buscas no existe')
}else{
     console.log('hubo un error y no sabemos que paso')
}
    

} catch(error){
    console.log(error);
}

}

cargarpeliculas()