/*
console.log(process.argv);
console.log("process.argv[1]");
console.log(process.argv[1]);
console.log("process.argv[2]");
console.log(process.argv[2]);
*/

var compiler_path = process.argv[2];
var template_path = process.argv[3];

var path = require('path');
var output_path = path.basename(template_path, '.hbs');
var template_name = path.basename(output_path, '.handlebars');
output_path = path.join(path.dirname(template_path), template_name);

var fs = require('fs');
var compiler = require(compiler_path);
var input = fs.readFileSync(template_path, {encoding: 'utf8'});
var template = compiler.precompile(input, false);
var output = 'Ember.TEMPLATES["' + template_name + '"] = Ember.HTMLBars.template(' + template + ');';
fs.writeFileSync(output_path + '.js', output, {encoding: 'utf8'});