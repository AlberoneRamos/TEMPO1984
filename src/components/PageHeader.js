import React,{Component} from 'react';
import {Navbar,Col,Row} from 'react-bootstrap';
import Logo from '../assets/loading.gif';
import {HeaderLeft,HeaderRight} from '../assets/SVGs';
import {withRouter} from 'react-router-dom';

class Navigation extends Component{
    subheaderRendering(pathname){
      if(pathname === '/') 
        return(
          <div>
            <Row className="nav-row" style={{width:'100%',margin:'-2px 0px 0px 0px', border:'2px solid black'}}>
              <Col><span>3 items</span></Col>
              <Col className="text-center"><span>211K in folder</span></Col>
              <Col style={{textAlign: 'right'}}><span>177K available</span></Col>
            </Row>
            <hr/>
          </div>
        );
    }

    render(){
        return(
          <div style={{margin:-2,marginBottom:'1vh'}}>
            <Navbar>
              <HeaderLeft/>
              <Navbar.Brand href="/" style={{margin:'1px 1vw 1px 1vw',width:'3em',padding:0,fontWeight:'bold', background:'white'}}>
                <img src={Logo} alt="Hourglass" style={{maxWidth:'100%',height:'auto', background:'white'}}/>
              </Navbar.Brand>
              <HeaderRight/>
            </Navbar>
            {this.subheaderRendering(this.props.location.pathname)}
          </div>
        )
    }
}
export default withRouter(props => <Navigation {...props}/>);
