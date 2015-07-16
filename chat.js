/* connect to the example chat data file*/


marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: false,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	smartypants: true
});

Gun.log.verbose = true;

var chat = Gun(location.origin + '/gun').get('example/chat/data').not(function(){
	/* put an initial welcome message into the example chat data */
	return this.put({1: {who: 'Welcome', what: "to the chat app!", when: 1}}).key('example/chat/data');
});

/* pull data from the example chat data source & map over each entry,
   where msg is the record containing the raw who, what, and when, and
   where field is the date/time with a random string assigned when generated for disambiguation */
chat.map().val(function(msg, field){

	var $ul = $('ul')
		, $last = $.sort(field, $ul.lastChild)
		, $msg;
	($msg = $("#msg-" + field) || $ul.insertBefore($.model.cloneNode(true)
		, $last.nextSibling)).id = 'msg-' + field;

	$msg.style = "min-height: 1.3em; line-height: 1.25em;";
	msg.color = msg.color || "000, 000, 000, 100";

	var generateElement = function(selector, value, style) {
		var element = $msg.querySelector(selector);
		if (selector === ".what") {
			element.innerHTML = marked(value);
		} else {
			element.textContent = value;
		}
		if(style) { element.setAttribute('style', style) }
		return element;
	};

	/* Show a message */
	generateElement('.who', msg.who, "background: rgba(" + msg.color + "); color: white;");
	generateElement('.when', new Date(msg.when).toLocaleTimeString().toLowerCase()
		, "color: rgba(" + msg.color + ");");
	generateElement('.what', msg.what, "color: rgba(" + msg.color + ");");

// TODO: VERIFY FOLLOWING REFACTOR DOESN'T BREAK ANY SORTING
//	$('.sort', $msg)[$.text] = field;
//	var $ = function(selector, element){return (element || document).querySelector(selector)} // make native look like jQuery.
	generateElement('.sort', field);

	/* keep the input form in view, unless the user has scrolled up to review earlier messages */
	if(document.body.scrollHeight - (window.scrollY + window.innerHeight) <= $ul.lastChild.scrollHeight + 50){
		window.scrollTo(0, document.body.scrollHeight);
	}

	localStorageButton();

});

var $ = function(selector, element) {
	return (element || document).querySelector(selector)
} // make native look like jQuery.

$.sort = function(when, e) {
	return (when > ($('.sort', e)[$.text] || 0))? e : $.sort(when, e.previousSibling)
};

$.text = document.body.textContent? 'textContent' : 'innerText'; // because browsers are stupid.

($.model = $('ul li').cloneNode(true)).removeAttribute('class');

// if there is an existing alias cookie then set the form's who field to that alias' value
$('#user').value = (document.cookie.match(/alias\=(.*?)(\&|$|\;)/i)||[])[1]||'';
// set the default user input focus to the form's what field
$('.what', $('form')).focus();
// function that runs whenever the user clicks or taps the submit button or presses enter from the message field
$('form').onsubmit = function(e){
	// create a new msg object ????????? WHEN IS THIS SAVED TO GUN ?????????
	var msg = {};
	// saves the current time to the gun msg record
	msg.when = Gun.time.is();
	// saves the local username to gun msg record and browser cookie
	document.cookie = ('alias=' + (msg.who = $('#user').value || 'user' + Gun.text.random(6)));
	// saves the local username's colorization value to gun msg record and browser cookie
	document.cookie = ('colorized=' + (msg.color = (colorUser(msg.who))));
	// save the form's what value to the gun msg record
	msg.what = $('.what', this).value || '';
	// saves the time plus a random 4 character string as the msg's entry path
	chat.path(msg.when + '_' + Gun.text.random(4)).put(msg);
	// clears the form's what field
	$('.what', this).value = '';
	// ?????????????????????????????????????????????????
	return (e && e.preventDefault()), false;
};

function localStorageButton(clear) {
	var msg;

	if (clear)  {
		localStorage.clear();
		msg = 'localStorage clear';
	}

	$('#storage')[$.text] = msg || ("Clear " + localStorage.length + " item" + (localStorage.length === 1 ? '' : 's'));
};