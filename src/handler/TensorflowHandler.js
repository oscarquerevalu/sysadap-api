const AI = require("../tensorflow/Tensorflow");
const tf = require('@tensorflow/tfjs')

let model = null;

module.exports =  {
    async predecirTensorflow(event, context, callback){ 
        const origin = event.headers.origin;
        console.log(event);     
        const ai = new AI();
        if(this.model == null){
            this.model = await ai.run();
        }
        
        const body = JSON.parse(event.body);
        console.log(body);       
        const arry = [body.t1, body.t2, body.t3, body.t4, body.t5, body.t6, body.t7, body.t8, body.t9, body.t10, body.t11, body.t12];
        console.log('arry ', arry);
        const input = await tf.tensor2d(arry, [1, 12]);	
        const prediccion = await this.model.predict(input);
        prediccion.print();
        const data = prediccion.dataSync();
        console.log('data ', data);
        const dataResponse = [
            {index: 0, value: (data[0] * 100).toFixed(2)},
            {index: 1, value: (data[1] * 100).toFixed(2)},
            {index: 2, value: (data[2] * 100).toFixed(2)},
            {index: 3, value: (data[3] * 100).toFixed(2)},
            {index: 4, value: (data[4] * 100).toFixed(2)},
            {index: 5, value: (data[5] * 100).toFixed(2)},
            {index: 6, value: (data[6] * 100).toFixed(2)},
            {index: 7, value: (data[7] * 100).toFixed(2)}
          ];
        
        
        const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            
            message: 'Este es el resultado de las Inteligencias de Gardner, jjb vas a caer!',
            input: dataResponse,
        }),
        };
    
        return response;
    }
};