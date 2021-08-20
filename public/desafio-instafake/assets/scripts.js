document.getElementById('btnCerrar').addEventListener('click', ()=>{//boton que limpia y carga la paguina.
    localStorage.clear();
    location.reload();
});

$('#js-form').submit(async (e) => {//captura el evento submit del formulario.
    e.preventDefault();
    //console.log('hola');
    const correo = document.getElementById('email').value;
    const clave = document.getElementById('password').value;
    const JWT = await postData(correo, clave);
    //const fotos = await getData(JWT);
    getData(JWT)
    console.log(JWT);
    console.log(correo);
    console.log(clave);
    document.getElementById('btnMasFotos').addEventListener('click', ()=>{ 

        console.log('hola1');
  
        let contador = 2;
  
        console.log(JWT, contador);              
  
        getDataMas(JWT, contador);         
  
        contador++; 
  
      });  
    
});
const postData = async (correo, clave) => {//permite hacer login en la api y obtener el token.
    try {
        const response = await fetch('http://localhost:3000/api/login',
            {
                method: 'POST',

                body: JSON.stringify({ email: correo, password: clave })
            })
        const { token } = await response.json();
        localStorage.setItem('jwt-token', token);
        return token
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}
const getData = async (jwt) => {//se le pasa como argumento el token, para obtener la data que son las ,fotos.
    try {
        const response = await fetch('http://localhost:3000/api/photos',
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
        const { data } = await response.json()
        if (data) {
            tabla(data,'js-table-posts')
            toggleFormAndTable('js-form-wrapper','js-table-wrapper')
            }
    } catch (err) {
        localStorage.clear()
        console.error(`Error: ${err}`)
    }
}

const getDataMas = async (jwt, id) =>{//
    try {
        console.log(id);
        const response = await fetch(`http://localhost:3000/api/photos?page=${id}`,
        {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwt}`
            }
        });
                const { data } = await response.json();
        console.log(data);    
        tabla(data, 'js-table-posts');
    } catch (error) {
        console.log(error);     
   }
}


const tabla = (datos, table) => {//se le pasan como argumento los datos para recorrerlos y pintarlos en la tabla.
    const tablaDatos = document.getElementById(table);
    
    datos.forEach(element => {//recorre el arreglo de los datos, esta dentro de la funcion tabla.
        tablaDatos.innerHTML += `
        <tbody >
            <tr>
              <td><img width="300px" src="${element.download_url}"></td>
            </tr>
            <tr>
              <td>Autor: ${element.author}</td>
            </tr>
        </tbody >
        `;
    });
}
const toggleFormAndTable = (form, table) => {//jq cambia el estado.
    $(`#${form}`).toggle()
    $(`#${table}`).toggle()
}
const init = async () => {
    const token = localStorage.getItem('jwt-token')
    if (token) {
        getData(token)
        
    }
}
init()
