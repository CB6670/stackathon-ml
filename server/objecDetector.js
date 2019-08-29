const tf = require('@tensorflow/tfjs-node');

const mobilenet = require('@tensorflow-models/mobilenet');

const toUint8Array = require('base64-to-uint8array');


class ObjectDetectors {

   constructor(image, type) {

       this.inputImage = image;
       this.type = type;
   }

   async loadMobileNetModal() {
       const modal = await mobilenet.load({
           version: 1,
           alpha: 0.25 | .50 | .75 | 1.0,
       })
       return modal;
   }

   getTensor3dObject(numOfChannels) {

       const imageData = this.inputImage.replace('data:image/jpeg;base64', '')
                           .replace('data:image/png;base64', '');

       const imageArray = toUint8Array(imageData);

       const tensor3d = tf.node.decodeJpeg( imageArray, numOfChannels );

       return tensor3d;
   }

   async process() {

       let predictions = null;
       const tensor3D = this.getTensor3dObject(3);

       const model =  await this.loadMobileNetModal();
       predictions = await model.classify(tensor3D);

       tensor3D.dispose();

      return {data: predictions, type: this.type};
   }
}

module.exports = ObjectDetectors;
