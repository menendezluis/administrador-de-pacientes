import React, {Fragment, useState} from 'react';
import uuid from 'react-uuid'
import axios from 'axios';

export default function Formulario(){

    //creando el registro
    const [registro, guardarRegistro] =useState({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        sintomas: '',
    })
    //funcion que se ejecuta al llenar datos

    const actualizarState = e => {
        guardarRegistro({
            ...registro,
            [e.target.name]:e.target.value
        })
    }
    const { name, lastname, email, phone, date, time, sintomas} = registro;
    const [error, actualizarError] = useState(false);
    

   const submitForm = async (e) => {
        e.preventDefault();
//Validando datos
        if (name.trim() === '' || lastname.trim() === '' ||
            email.trim() === '' || phone.trim() === '' ||  
            date.trim() === '' || time.trim() === '' ||
            sintomas.trim() === ''  ) {
                 //Eliminar mensaje de error
                actualizarError(true);
                return;
            }     
       
        const url = 'https://api.apispreadsheets.com/data/8173/';
        let  payload = {
            data: [{"NombreMascota":name,"NombreDueno":lastname,"Email":email,"Telefono":phone,"FechaCita":date,"HoraCita":time,"Sintomas":sintomas}]
        };
        console.log(payload);
            actualizarError(false);
             //Asignando un ID
            registro.id = uuid();
            /*sin hooks
            await axios({
                url: url,
                method: 'post',
                data: payload
              }) */
              //Enviar el Registro
              await axios.post(url,payload).then(function (response) {
                // your action after success
                console.log(response);
            })
            .catch(function (error) {
               // your action on error success
                console.log(error);
            });
            //Reiniciar el form
            guardarRegistro({
                name: '',
                lastname: '',
                email: '',
                phone: '',
                date: '',
                time: '',
                sintomas: ''
            })
            } 
    
    return(
        <Fragment>
        <h2>Registrar cumpleaños</h2>
        <form
        onSubmit={submitForm}
        >
            { error ? <p className="alerta-error">Todos 
            los campos son obligatorios  </p>
                 : null
                }
            <label>Nombre</label>
            <input
                type="text"
                name="name"
                className="u-full-width"
                placeholder="Ingresa tu nombre"
                onChange={actualizarState}
                value={name}
                />
                <label>Apellido</label>
                 <input
                type="text"
                name="lastname"
                className="u-full-width"
                placeholder="Ingresa tu apellido"
                onChange={actualizarState}
                value={lastname}
                />
                 <label>Email</label>
            <input
                type="email"
                name="email"
                className="u-full-width"
                placeholder="Ingresa tu Correo"
                onChange={actualizarState}
                value={email}
                />
                  <label>Telefono</label>
            <input
                type="tel"
                name="phone"
                className="u-full-width"
                placeholder="Ingresa tu telefono"
                onChange={actualizarState}
                value={phone}
                />
                <label>Fecha</label>
                <input
                type="date"
                name="date"
                className="u-full-width"
                onChange={actualizarState}
                value={date}
                />
               <label>Hora</label>
                <input
                type="time"
                name="time"
                step="300"
                className="u-full-width"
                onChange={actualizarState}
                value={time}
                />
                <label>Sintomas</label>
                <textarea
                name="sintomas"
                className="u-full-width"
                placeholder="Ingrese los sintomas"
                onChange={actualizarState}
                value={sintomas}
                />
                <button
                type="submit"
                className="u-full-width button-primary"
                >Crear cita</button>
        </form>
        </Fragment>
    )
}