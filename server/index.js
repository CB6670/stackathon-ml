const express = require('express');
const app = express();
const path = require('path');
const ObjectDetectors = require('./objecDetector');

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

app.use('/', express.static(path.join(__dirname, '..', 'public')));

app.post('/api/detect_image_objects', async (req, res) => {
    try {
        const data = req.body.data;
    const type = req.body.type;
    const objectDetect = new ObjectDetectors(data, type);
    const results = await objectDetect.process();
    console.log(results)
    res.json(results);
    } catch (err){
    console.error(err);
    }
  });

app.listen(port, () => {
    console.log(`listening in on port: ${port}`)
});

module.exports = app;
