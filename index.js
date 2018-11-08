const sharp = require('sharp');
const fs = require('fs');

const dir = './assets';
const resizeMultiplier = 3;

fs.readdir(dir, (err, items) => {
    if(!err){
        items.forEach((img) => {
            var imgLocation = `${dir}/${img}`;
            sharp(imgLocation).metadata()
                .then(info => {
                    var width = info.width;
                    var height = info.height;
                    return {width, height}
                })
                .then(dimensions => {
                    sharp(imgLocation)
                        .resize(dimensions.width*resizeMultiplier,dimensions.height*resizeMultiplier, {kernel: 'nearest'})
                        .toFile(`./resized_assets/${img}`);
                })
        })
    }
})
