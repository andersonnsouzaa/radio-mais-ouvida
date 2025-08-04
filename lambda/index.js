const Alexa = require('ask-sdk-core');

const STREAM_URL = 'https://stm23.xcast.com.br:7054/stream.mp3';
const TOKEN = 'radio_mais_ouvida_token';

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('Tocando a mais ouvida da cidade!')
            .addAudioPlayerPlayDirective('REPLACE_ALL', STREAM_URL, TOKEN, 0)
            .getResponse();
    }
};

const PauseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
               Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const StopIntentHandler = {
    canHandle(handlerInput) {
        const requestType = Alexa.getRequestType(handlerInput.requestEnvelope);
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        return requestType === 'IntentRequest' &&
            (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PauseIntentHandler,
        StopIntentHandler,
        SessionEndedRequestHandler
    )
    .lambda();
