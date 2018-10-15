import React, {Component} from 'react'
import { Input,InputGroup, InputGroupAddon, Button } from 'reactstrap'
import {connect} from 'react-redux'

import {enviaMensagem} from './../../Store/Actions/chat'
import {conversaWatson} from './../../Store/Actions/watson'

class ChatMensagem extends Component{
    constructor(props){
        super(props)

        this.inputEnviaTexto = this.inputEnviaTexto.bind(this)
        this.props.conversaWatson('','')
    }

    inputEnviaTexto(event){
        if(event.keyCode === 13){
            console.log(event.target.value);
            const mensagem = {
                texto: event.target.value,
                origem: 'user'
            }
            let context = {}
            if(this.props.resposta.data && this.props.resposta.data.context){
                context = this.props.resposta.data.context
            }

            this.props.enviaTexto(mensagem)
            this.props.conversaWatson(mensagem,context)
            event.target.value = ''
        }
    }

    render() {
        return (
            <div className="chatMensagem">
            <hr></hr>
            <InputGroup>
                <Input onKeyDown={this.inputEnviaTexto} placeholder='Digite sua mensagem'/>
                    <InputGroupAddon addonType='append'>
                        <Button color='success'>Enviar</Button>
                    </InputGroupAddon>
            </InputGroup>
            </div>
        )
    }
}

// dispacha a funcao enviatexto pro props para ser usado no render
const mapDispatchToProps = (dispatch) => {
    return {
        enviaTexto: (msg) => dispatch(enviaMensagem(msg)),
        conversaWatson: (msg,context) => dispatch(conversaWatson(msg,context))
    }
}

const mapStateToProps = (state) => {
    return{
        resposta: state.watson.respostas
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ChatMensagem)