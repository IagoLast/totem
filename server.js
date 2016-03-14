var express = require('express');
var app = express();
var server = app.listen(8081);
app.use(express.static(__dirname));
