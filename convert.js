var fs = require('fs');
var json = fs.readFileSync('./data.json');
var all = JSON.parse(json);
for(var i in all.keys){
	var val = all.keys[i], graph = {}, rel = {};
	if(val){
		rel['#'] = val;
		graph[val] = rel;
		all.keys[i] = graph;
	}
};
fs.writeFileSync('./data.json', JSON.stringify(all));
console.log("migrated");