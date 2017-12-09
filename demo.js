var fs = require('fs');

var data = {
    name: 'Bob'

}

fs.writeFile('data1.json', JSON.stringify(data), (err) => {

console.log('write finished', err);

});
