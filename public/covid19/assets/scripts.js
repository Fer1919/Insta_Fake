$('#js-form').submit(async (e)=>{

    

    e.preventDefault();

    console.log('hola');



    const correo = document.getElementById('email').value;

    const clave = document.getElementById('password').value;

    const JWT = await postData(correo, clave);

    console.log(JWT);

   

    console.log(correo);

    console.log(clave);

});



const postData = async (correo, clave)=> {



    try {

        const response = await fetch('http://localhost:3000/api/login',

        {

            method: 'POST',

            body: JSON.stringify({email: correo, password: clave})

        })

        const { token } = await response.json();

        return token

    } catch (error) {

        console.error(`Error: ${error}`);        

    }

}



const getData = async(JWT)=>{



    try {

        

    } catch (error) {

        

    }

}