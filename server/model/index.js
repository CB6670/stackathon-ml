const tf = require('@tensorflow/tfjs-node');
tf.enable_eager_execution()
const AUTOTUNE = tf.data.experimental.AUTOTUNE

const image = tf.image.decode_jpeg(tf.read_files('./images'), channels=1)
sess = tf.InteractiveSession()
print(sess.run(image))

const model = tf.sequential({
    layers: [
        tf.layers.dense({inputShape: [784], units: 32, activation: 'relu'}),
        tf.layers.dense({units: 10, activation: 'softmax'})
    ]
});

model.compile({
    optimizer: 'sgd',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
})