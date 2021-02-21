import React, {Fragment, useState} from 'react';
import Formulario from './components/Formulario'
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
                        2
                    </div>
                </div>
            </div>
        </Fragment>
    )
}