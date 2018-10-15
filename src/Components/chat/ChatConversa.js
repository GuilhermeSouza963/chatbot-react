import React, {Component} from 'react'
import { Alert, Badge } from 'reactstrap'
import {connect} from 'react-redux'

class ChatConversa extends Component{

    renderMensagem(msg, k) {
        return (
        <div key={k}>
            {
                //if condicional &&
                msg.origem === 'user' && <span>
                    <Badge color='primary'>Você disse: </Badge>
                    <Alert color='primary'>{msg.texto}</Alert>
                </span>
            }

            {
                //if condicional &&
                msg.origem === 'bot' && <span>
                    <Badge color='warning'> ChatBot disse:</Badge>
                    <Alert color='warning'>{msg.texto}</Alert>
                </span>
            }
        </div>
        )
    }

    render(){
        return(
            <div className="chatConversa">
                {
                    // map percorre o array dentro do mensagens como se fosse um foreach e retorna a funcao que monta o html
                    Object.keys(this.props.mensagens).map(key => {
                        // percorre o array dentro do state pela chave key
                        return this.renderMensagem(this.props.mensagens[key], key)
                    })
                }
            </div>
        )
    }
}

// ele seta o state no props
const mapStateToProps = (state) => {
    return {
        // retorna o state criado no reducer chat
        mensagens: state.chat.mensagens
    }
}

export default connect(mapStateToProps, null)(ChatConversa) 