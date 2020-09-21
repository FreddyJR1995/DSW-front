import React from 'react';
import ArticleList from '../components/ArticleList';
import { useArticleList } from '../data/useArticleList';
import ShowError from '../components/ShowError';
import {Button, Card, Col, Image, Row} from "antd";
import Routes from "../constants/routes";
import {Link} from "react-router-dom";
import index from "../images/index.svg";
import profiles from "../images/profiles.jpg";
const HomePage = () => {
  const articles = useArticleList();

  return (
    <>
        <h1 align={'center'} style={{fontFamily:'helvética',fontSize:28,fontWeight:'bold'}}>QuickStockSystem</h1>
        <hr/>
        <br/>
        <br/>
        <div>
            <Row>
                <Col align='center' style={{marginTop: 80}}>
                    <h1 style={{fontFamily: 'helvética', fontSize: 24}}>
                        En QuickStockSystem<br/>
                        Te ayudamos a llevar tu inventario de productos ordenadamente<br/>
                        Realiza tu inventario con facilidad <br/>
                        Contacta a tus proveedores rápidamente<br/>
                        Organiza tus productos de una forma sencilla<br/>
                    </h1>

                    <Button type="primary" size="large"><Link to={Routes.REGISTER}>Registrate YA!!</Link></Button>
                </Col>

                <Col xs={24} md={6} className='logo-wrapper'>
                    <a href={process.env.REACT_APP_DOMAIN}>
                        <Image width={400} height={100} style={{marginLeft: 60}} src={index} alt='Trial Q'/></a>
                </Col>
            </Row>
        </div>
        <br/>
        <hr/>
        <br/>
        <div className="site-card-wrapper" align={'center'}>
            <Row align={'center'}>
                <h1 style={{fontFamily:'helvética',fontSize:28,fontWeight:'bold'}}>Beneficios a nuestros clientes</h1>
            </Row>
            <Row gutter={16} align={'center'}>
                <Col span={8}>
                    <Card title="Comerciantes" bordered={false} style={{ width: 300,background:"#f63d3d",color:"#ffffff"}} >
                        <p>Realiza tu inventario</p>
                        <p>Contacta a tu proveedor</p>
                        <p>Notifica a tu proveedor a solicitud de un servicio</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Proveedores" bordered={false} style={{ width: 300,background:"#f63d3d",color:"#ffffff"}}>
                        <p>Muestrate ante otros comerciantes</p>
                        <p>Posiciona tu servicio</p>
                        <p>Acercate más a los comerciantes</p>
                    </Card>
                </Col>
            </Row>
        </div>
        <br/>
        <hr/>
        <br/>
        <div>
            <Row>
                <Col span={10}>
                    <br/>
                    <br/>
                    <h1 align={'center'}style={{fontFamily:'helvética',fontSize:28,fontWeight:'bold'}}>¿Quienes Somos?</h1>
                    <br/>
                    <p style={{fontFamily:'helvética',fontSize:20}} align={'center'}>
                        <br/>
                        Somos estudiantes de la<br/>
                        Escuela Politécnica Nacional<br/>
                        tratando de solucionar y ayudar a<br/>
                        la comunidad en los estos momentos<br/>
                        donde la automatización de algunos<br/>
                        servicios es importante<br/>
                    </p>
                </Col>
                <Col span={14} align={'center'} style={{background:"rgba(226,204,61,0.47)"}}>
                    <Image src={profiles} width={400}/>
                </Col>
            </Row>
        </div>
    </>
  );
};


export default HomePage;
