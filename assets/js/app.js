// Lo primero que hace el script es definir la variable baseEndpoint, la cual contiene la URL de la API de GitHub de la cuál se sacarán datos para pintarlos en el HTML
const baseEndpoint = 'https://api.github.com';

// En la constante usersEndpoint se extrae toda la URL de baseEndpoint con plantillas literales y se le añade el endpoint de usuarios para acceder a la información de usuarios de GitHub.
const usersEndpoint = `${baseEndpoint}/users`;

// En la variable $n se selecciona la clase name del documento HTML para posteriormente pintarla con los datos obtenidos de la API. Se añade el punto porque al usar un querySelector se tiene que especificar si el dato es clase o id y en el html se ve que es una clase.
const $n = document.querySelector('.name');

// blog es una clase y no un id como estaba puesto anteriormente, por lo tanto se cambia el "#" por un ".".
const $b = document.querySelector('.blog');

// La clase location no existe en el html, por lo tanto se agrega como un párrafo.
const $l = document.querySelector('.location');


// Se agregó el async porque sin esa palabra reservada no funciona el await que sirve para esperar la finalización de una promesa.
// Esta función toma un parámetro username y establece el contenido de $n a un string que diga cargando.... Después, realiza la solicitud de la API de GitHub con el fetch para obtener el username de la API y guarda la respuesta en la variable "response".
async function displayUser(username) {
  $n.textContent = 'cargando...';
  const response = await fetch(`${usersEndpoint}/${username}`);

  //console.log(data); Error, la variable data no está definida, probablemente querían llamar a la variable response. Este console.log hace que se muestre toda la información del username obtenida con el fetch en la consola.
  console.log(response);

  //Se añade la variable data para convertir los elementos obtenidos de la api a json.
  let data = await response.json();

  // Se establece el contenido de $n a data.name que es el nombre de usuario obtenido de la api.
  $n.textContent = data.name;

  // Se establece el contenido de $b al valor data.blog que es el blog del usuario obtenido de la api.
  $b.textContent = data.blog;

  // Se establece el contenido de $1 al valor data.location que es la ubicación del usuario obtenida de la api.
  $l.textContent = data.location;
}

// Esta función toma como parámetro err que es la respuesta del catch y muestra los mensajes OH! NO! y el error en la consola, esta función se ejecuta cuando la promesa del fetch se rechaza, ya que en la línea 48 se le asigna a el método catch.
function handleError(err) {
  console.log('OH NO!');
  console.log(err);
  //n.textContent = `Algo salió mal: ${err}` error, le hacía falta el signo de $ porque "n" no está definida.
  $n.textContent = `Algo salió mal: ${err}`
}

// Aquí se llama a la función displayUser con el username "stolinski" y se asigna cualquier error a la función handleError gracias al catch. 
displayUser('stolinski').catch(handleError);