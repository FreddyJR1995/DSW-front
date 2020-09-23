import React, {useState} from 'react';
import {useAuth} from "../providers/Auth";
import API from "../data";
import ErrorList from "../components/ErrorList";
import {message, Form, Modal, Input} from 'antd';
import {translateMessage} from "../utils/translateMessage";


const NewProduct =({show,
                       close,
                       update,
                       onSubmit})=>{
    const {setAuthenticated, setCurrentUser} = useAuth();
    const [show, setShow] = useState(true);
    const [form] = Form.useForm();
    const [isSavingProduct, setIsSavingProduct] = useState(false);

    const onCreate = async values => {
        console.log('Received values of form: ', values);

        form.validateFields()
            .then(async (values) => {
                console.log('values', values);
                setIsSavingProduct(true);

                // use form data to be able to send a file to the server
                const data = new FormData();
                data.append('name', values.name);
                console.log('datos',data);

                try {
                    await API.post('/products', data); // post data to server
                    form.resetFields();
                    setIsSavingProduct(false);
                    onSubmit();
                } catch (e) {
                    setIsSavingProduct(false);

                    const errorList = e.error && <ErrorList errors={e.error}/>;
                    message.error(<>{translateMessage(e.message)}{errorList}</>);
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });

    };
    const onUpdate = async values => {
        console.log('Received values of form: ', values);

        form.validateFields()
            .then(async (values) => {
                console.log('son values',values);
                try {
                    await API.put('/courses', values); // post data to server
                    form.resetFields();
                    onSubmit();
                } catch (error) {
                    console.error(
                        'You have an error in your code or there are Network issues.',
                        error
                    );

                    message.error(translateMessage(error.message));
                }
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });

    };
    return (
        <>
            <Modal
                title='Ingrese un producto'
                visible={show}
                onOk={!update
                    ? onCreate
                    : onUpdate}
                onCancel={close}
                confirmLoading={isSavingProduct}

            >
                <Form
                    form={form}
                    name='form_in_modal'
                    initialValues={{remember: true}}


                    //onFinish={onFinish}
                    //onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label='Ingrese el nombre del producto'
                        name='name'
                        rules={[
                            {
                                required: false,
                                message: 'Ingresa un nombre válido',

                            }
                        ]}
                    >
                        <Input rows={4}/>
                    </Form.Item>
                    <Form.Item
                        label='Ingrese la descripción'
                        name='description'
                        rules={[
                            {
                                required: false,
                                message: 'Ingresa un un texto corto',

                            }
                        ]}
                    >
                        <Input rows={4}/>
                    </Form.Item>
                    <Form.Item
                        label='Ingrese el precio'
                        name='price'
                        rules={[
                            {
                                required: false,
                                message: 'Ingresa un valor valido',

                            }
                        ]}
                    >
                        <Input rows={4}/>
                    </Form.Item>
                    <Form.Item
                        label='Ingrese la cantidad'
                        name='quantity'
                        rules={[
                            {
                                required: false,
                                message: 'Ingresa un número',

                            }
                        ]}
                    >
                        <Input rows={4}/>
                    </Form.Item>
                    <Form.Item
                        label='Ingrese la base para notificar'
                        name='base'
                        rules={[
                            {
                                required: false,
                                message: 'Ingresa un número menor a la cantidad',

                            }
                        ]}
                    >
                        <Input rows={4}/>
                    </Form.Item>
                    <Form.Item
                        label='Ingrese el identificador de la categoria'
                        name='category_id'
                        rules={[
                            {
                                required: false,
                                message: 'Ingresa un número',

                            }
                        ]}
                    >
                        <Input rows={4}/>
                    </Form.Item>
                    <Form.Item
                        label='Ingrese el identificador del proveedor'
                        name='provider_id'
                        rules={[
                            {
                                required: false,
                                message: 'Ingresa un número',

                            }
                        ]}
                    >
                        <Input rows={4}/>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default NewProduct;