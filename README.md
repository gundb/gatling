gun [![Build Status](https://travis-ci.org/amark/gun.svg?branch=master)](https://travis-ci.org/amark/gun)
===

Gatling is a super simple, self-hosted, chat system built using GUN.  GUN is a realtime, decentralized, embedded, graph database engine.





## Getting Started

If you do not have [node](http://nodejs.org/) or [npm](https://www.npmjs.com/) and [git], read [this](https://github.com/amark/gun/blob/master/examples/install.sh) first.
Then in your terminal, run:

```bash
git clone git+https://github.com/gundb/gatling.git
```

If you want to have a copy of the data on S3, update `chat/http.js` with your AWS S3 credentials:

```javascript  
var gun = Gun({
	file: 'data.json',
	s3: { // Optional; update to save a copy to AWS S3
		key: '', // AWS Access Key
		secret: '', // AWS Secret Token
		bucket: '' // The bucket you want to save into
	}
});
```

Using S3 is recommended for deployment, and using just a file is recommended for local development.

From the terminal or command line, start up the http server:

```bash
npm start
```

Fire up your browser and hit the displayed URL.


## YOU and GUN
Gatling is a demonstration application for (GUN)[github.com/amark/gun].
GUN is just getting started, so join us! Being lonely is never any fun, especially when programming.
We want to help you, because our goal is for GUN to be the easiest database ever.
That means if you ever get stuck on something for longer than 5 minutes,
you should talk to us so we can help you solve it.
Your input will also help us improve gun.
We are also really open to contributions! GUN is easy to extend and customize:

`Gun.on('opt').event(function(gun, opt){ /* Your module here! */  })`

It is also important to us that your database is not a magical black box.
So often our questions get dismissed with "its complicated hard low level stuff, let the experts handle it."
And we do not think that attitude will generate any progress for people.
Instead, we want to make everyone an expert by actually getting really good at explaining the concepts.
So join our community, in the quest of learning cool things and helping yourself and others build awesome technology. 

 - [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/amark/gun?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) (all chats relating to GUN and development should be here! IRC style)
 - Google Group: https://groups.google.com/forum/#!forum/g-u-n (for slower threaded discussions)