document.addEventListener('DOMContentLoaded', function(){
    crearGaleria();
});

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= 12; i++ ){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`; 
        imagen.dataset.imagenId = i;

        imagen.onclick = mostrarImagen;
        
        const lista = document.createElement('LI');
        lista.appendChild(imagen)
        
        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    const id = parseInt( e.target.dataset.imagenId);

    
    
    //GENERAR LA IMAGEN
    const imagen = document.createElement('IMG')
    imagen.src = `build/img/grande/${id}.webp`; 
    imagen.classList.add('imagen-zoom');

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick = function (){
        overlay.remove();
        body.classList.remove('fijar-body');
    }
     

    //CERRAR IMAGEN
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    cerrarImagen.onclick = function () {
        overlay.remove();
        body.classList.remove('fijar-body');
    }

    overlay.appendChild(cerrarImagen);
  
    //MOSTRAR EN EL HTML

    const body = document.querySelector('body');
    body.appendChild(overlay);  
    body.classList.add('fijar-body');
   
}

