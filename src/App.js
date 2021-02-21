import React, {Fragment, useState} from 'react';
import Formulario from './components/Formulario'
import ListadoCitas from './components/ListadoCitas'
import './style.css'

export default function App(){
    //Arreglo de citas

    const [citas, guardarCitas] = useState([]);

    //Fucnión que tome las citas actuales
    const crearCita = registro => {
        guardarCitas([
            ...citas, registro
        ]);
    }
    const eliminarCita = id => {
        const nuevasCitas = citas.filter(registro => registro.id !== id);
        guardarCitas(nuevasCitas);
    }
    const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

    return(
        <Fragment>
            <h1>Administrador de Pacientes</h1>
            <div className="container">
                <div className="row">
                    <div className="one-half column">
                        <Formulario 
                        crearCita = {crearCita} />
                    </div>
                    <div className="one-half column">
                        <h2>{titulo}</h2>
                        {citas.map(registro => (
                         <ListadoCitas 
                         key={registro.id}
                         registro={registro}
                         eliminarCita={eliminarCita}
                         />   
                        ))}
                        
                    </div>
                </div>
            </div>
        </Fragment>
    )
}