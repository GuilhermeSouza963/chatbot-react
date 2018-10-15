import axios from 'axios'
import {enviaMensagem} from './chat'

export const conversaWatsonRequest = () =>{
    return {
        type: 'CONVERSA_WATSON_REQUEST',
        carregando: true,
        erro: false
    }
}

export const conversaWatsonSucess = (respostas) => {
    return {
        type: 'CONVERSA_WATSON_SUCESS',
        respostas,
        carregando: false,
        erro: false
    }
}

export const conversaWatsonError = () => {
    return {
        type: 'CONVERSA_WATSON_ERROR',
        carregando: false,
        erro: true
    }
}

// faz a ligacao de todas as funcoes dando dispatch para o reducer
export const conversaWatson = ((mensagem,contexto) => {
    return dispatch => {
        dispatch(conversaWatsonRequest())
        // chama o backend do watson(firebase cloud functions) https://us-central1-chatbot-watson-214ec.cloudfunctions.net/conversa
        const url = 'https://us-central1-chatbot-watson-214ec.cloudfunctions.net/conversa'
        axios
            .post(url, { input: mensagem.texto, context: contexto})
            .then((data) => {
                dispatch(conversaWatsonSucess(data))
                const msg = {
                    texto: data.data.output.text[0],
                    origem: 'bot'
                }
                dispatch(enviaMensagem(msg))
            })
            .catch(() => dispatch(conversaWatsonError()))
    }
})