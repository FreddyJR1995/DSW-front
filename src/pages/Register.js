import React, {useState} from 'react';
import Routes from '../constants/routes';
import API from '../data/index';
import {Button, Col, Form, Input, message, Modal, Row, Typography} from 'antd';
import {LockOutlined, UserOutlined, MailOutlined, EditOutlined, BankOutlined, PhoneOutlined, FormOutlined} from '@ant-design/icons';
import ErrorList from '../components/ErrorList';
import {translateMessage} from '../utils/translateMessage';
import withoutAuth from '../hocs/withoutAuth';
import '../styles/register.css';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import {useAuth} from '../providers/Auth';
import {EyeInvisibleOutlined, EyeTwoTone} from '@ant-design/icons/lib';
import seller from '../images/seller.svg';
import provider from '../images/provider.svg';

const {Title} = Typography;

const Register = () => {
    // const auth = useAuth();
    // const router = useRouter();

    // React.useEffect( () => {
    //   const checkAuthentication = () => {
    //     console.log( 'auth.token', auth );
    //     if( auth.token ) {
    //       router.push( Routes.HOME );
    //     }
    //   };
    //
    //   checkAuthentication();
    // }, [ auth ] );

    const {setAuthenticated, setCurrentUser} = useAuth();
    const [role, setRole] = useState('');
    const [show, setShow] = useState(true);

    const onFinish = async (userData) => {
        console.log('Received values of form: ', userData);
        const {name, lastname,email, password, password_confirmation, phone, business_name, description} = userData;

        try {
            const user = await API.post('/register', {
                name,
                lastname,
                email,
                password,
                password_confirmation,
                phone,
                business_name,
                description,
                role,
            });

            console.log('User', user);

            localStorage.setItem('login', JSON.stringify(true)); // this is to sync auth state in local storage
            Cookies.set('token', user.data.token, {expires: 1});
            API.headers['Authorization'] = 'Bearer ' + user.data.token; // start sending authorization header
            delete user.data.token;
            setCurrentUser(user.data);
            setAuthenticated(true);
        } catch (e) {
            console.error('No se pudo registrar el usuario', e);
            setAuthenticated(false);
            const errorList = e.error && <ErrorList errors={e.error}/>;
            message.error(<>{translateMessage(e.message)}{errorList}</>);
        }
    };

    const handleSeller = () => {
        const role = 'ROLE_SELLER'
        setRole(role);
        setShow(false);
        console.log(role);
    };

    const handleProvider = () => {
        const role = 'ROLE_PROVIDER'
        setShow(false);
        setRole(role);
        console.log(role);
    }

    return (
        <>
            <Modal
                visible={show}
                title='Bienvenido A Quick Stock System'
                closable={false}
                footer={null}
            >

                <div style={{textAling: 'center'}}>
                    <h2>Dinos quién Eres</h2>
                </div>
                <div>
                    <button className='seller'><img alt='Seller' src={seller} onClick={handleSeller} /></button>
                    <button className='provider'><img alt='Provider' src={provider} onClick={handleProvider}/></button>
                </div>
                <div style={{textAlign: 'center'}}>
                    <Row>
                        <Col span={11}><h3>Soy Comerciante</h3></Col>
                        <Col span={13}><h3>Soy Proveedor</h3></Col>
                    </Row>
                </div>
                <div style={{textAlign: 'center'}}>
                    <Button type="primary" style={{margin: 8}}><Link to={Routes.HOME}>Cancelar</Link></Button>
                </div>
            </Modal>

            <Title style={{textAlign: 'center'}}>Registro</Title>

            <Row justify='center' className='login'>
                <Col span={8}>
                    <Form name='register-form'
                          className='register-form'
                          initialValues={{
                              email: '',
                              password: ''
                          }}
                          onFinish={onFinish}
                    >
                        <Form.Item name='name'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa tu nombre'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<UserOutlined/>} placeholder='Nombre'/>
                        </Form.Item>

                        <Form.Item name='lastname'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa tu apellido'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<UserOutlined/>} placeholder='Apellido'/>
                        </Form.Item>


                        <Form.Item name='email'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa tu nombre de usuario'
                                       },
                                       {
                                           type: 'email',
                                           message: 'Ingresa un correo válido'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<MailOutlined/>} placeholder='Email'/>
                        </Form.Item>

                        <Form.Item name='password'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa tu clave'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                            placeholder='Clave'/>
                        </Form.Item>

                        <Form.Item name='password_confirmation'
                                   dependencies={['password']}
                                   hasFeedback
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Confirma tu clave',
                                       },
                                       ({getFieldValue}) => ({
                                           validator(rule, value) {
                                               if (!value || getFieldValue('password') === value) {
                                                   return Promise.resolve();
                                               }
                                               return Promise.reject('Las claves no coinciden');
                                           },
                                       }),
                                   ]}
                        >
                            <Input.Password prefix={<LockOutlined/>}
                                            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                            placeholder='Confirma tu clave'/>
                        </Form.Item>

                        <Form.Item name='phone'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Ingresa su número telefónico'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<PhoneOutlined />} placeholder='Teléfono'/>
                        </Form.Item>

                        <Form.Item name='business_name'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Cuantanos a cerca de tu negocio o empresa'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input prefix={<BankOutlined />}
                                            placeholder='Nombre de negocio o empresa'
                                            autoSize={{
                                                minRows: 2,
                                                maxRows: 6
                                            }}/>
                        </Form.Item>

                        <Form.Item name='description'
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Cuantanos sobre tu empresa'
                                       }
                                   ]}
                                   hasFeedback
                        >
                            <Input.TextArea prefix={<FormOutlined />} placeholder='Descripción corta'/>
                        </Form.Item>

                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='login-form-button'>
                                Registrarme
                            </Button>
                            <div><Link to={Routes.LOGIN}>Ya tengo una cuenta</Link></div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default withoutAuth(Register);
