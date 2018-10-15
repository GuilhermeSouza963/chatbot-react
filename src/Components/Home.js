import React, {Component} from 'react'
import { Button } from 'reactstrap';

class Home extends Component{
    render(){
        return(
            <div className='home'>
                <p className="App-intro">
                  Simple Chatbot Application created in React.js </p>
                  <p>
                  for Ibm Watson Assistant
                </p>
                <Button color="danger">Danger!</Button>
            </div>

        )
    }
}

export default Home