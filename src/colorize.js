/**
 * Created by MetaSean on 20150622.
 */

	// hashCode is strongly based on
	// http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		chr = (this.charCodeAt(i) * 2.2); // `* 2.2` increases entropy
		hash = ((hash<<32)-hash)+chr; // was previously `hash = ((hash<<5)-hash)+chr;`
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};


function colorUser(user) {

	var rgb = "";

	// need to divide the username into three sections
	// one each for R, G, & B
	var length = Math.floor((user.length)/3);

	// a section must be at least one character in length
	length = length > 1 ? length : 1;

	// for each section
	// run it through the hashCode then
	// move it into a dark range on the hex color scale
	for (var i = 0; i < 3; i++) {
		var start = i * length;
		var end = (i === 2) ? user.length : ((i + 1) * length);
		var segment = user.slice(start, end);
		segment = Math.floor((segment.hashCode() - 96 ));
		rgb += segment + ", ";
	}

	// return the string with an alpha value
	return rgb + "100";
}