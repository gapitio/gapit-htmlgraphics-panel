import { readFile, writeFile } from 'fs';
import { resolve } from 'path';
import svgo from 'svgo';
import svgoConfig from './svgo.config.js';

const svgData = () => {
  const filepath = resolve('src/Design/svg-data-inkscape.svg');

  const Svgo = new svgo(svgoConfig);

  readFile(filepath, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }

    Svgo.optimize(data, { path: filepath }).then(function (result) {
      writeFile(resolve('dist/svg-data.svg'), result.data, (err) => {
        if (err) console.log(err);
        console.log('Successfully written svg file.');
      });
    });
  });
};

export default svgData();
