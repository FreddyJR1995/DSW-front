import React from 'react';
import { useAuth } from '../providers/Auth';
import { Descriptions, Badge } from 'antd';
const Profile=()=>{
    console.log(useAuth());
    const info=useAuth().currentUser;
return(
    <>
        <h1 className='title'>
            Perfil del Usuario
        </h1>
        {
            info
                ?
            <>
            <Descriptions title="Información Personal" bordered>
                <Descriptions.Item label="Nombre">{info.name}</Descriptions.Item>
                <Descriptions.Item label="Correo">{info.email}</Descriptions.Item>
                <Descriptions.Item label="Tipo de usuario">{info.role}</Descriptions.Item>
                <Descriptions.Item label="Fecha de creación">{info.created_at}</Descriptions.Item>
            </Descriptions>
            </>
                :
                'Cargando...'
        }

    </>
)}


export default Profile;
