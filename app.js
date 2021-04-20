var express = require('express')
  , http = require('http')
  , cors = require('cors')
  , path = require('path')
  , fs = require('fs');

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(cors());
app.use(app.router);
app.use("/", express.static(__dirname + '/static'));

app.locals({
    title: 'tasmineroutinfo'    // default title
});


app.get('/test', function(req, res){
	res.end("abcd");
});

app.post('/comment', function(req, res){
	var payload = JSON.stringify(req.body);
	var fileName = + new Date();
	fs.writeFile(__dirname+"/feedbacks/"+fileName, payload, function(err) {
	    res.end("success");
	}); 
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening at: http://localhost:%d/', app.get('port'));
});
