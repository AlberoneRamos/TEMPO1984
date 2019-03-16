import React,{Component} from 'react';
import {Navbar,Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

export default class Navigation extends Component{
    render(){
        return(
          <div>
            <Navbar>
               <Nav className="mr-auto">
                    <LinkContainer to="/"><Nav.Link style={{marginLeft:"0.7em"}}>¤</Nav.Link></LinkContainer>
                    <LinkContainer to=""><Nav.Link>Home</Nav.Link></LinkContainer>
                    <LinkContainer to="time-left"><Nav.Link>Time Left</Nav.Link></LinkContainer>
                    <LinkContainer to="what-to-do"><Nav.Link>What to Do</Nav.Link></LinkContainer>
               </Nav>
            </Navbar>
          </div>
        )
    }
}