var util = require('util'),
	winston = require('winston'),
	dgram = require('dgram');

var XmlLayout = require('./layouts/xml');

var Log4jUdpLogger = winston.transports.Log4jUdpLogger = function (options) {

	this.name = 'winston-log4j-udp';

	this.level = options.level || 'info';

	this.app = options.app;
	this.host = options.host;
	this.port = options.port;
	this.layout = new XmlLayout();
	//this.getLayout(
		//options.layout || 'xml', 
		//options.layoutFormatString
	//);
	this.machineName = 'UK1PC114';  //getMachineName();
		
	this.udpClient = dgram.createSocket('udp4');
};

Log4jUdpLogger.prototype.getLayout = function (layoutName, layoutFormatString)
{
	switch(layoutName.toLowerCase())
	{
		case 'xml':
			return new XmlLayout();
		default:
			throw new Exception('Invalid layout was specified: ' + layoutName)
	}
};

Log4jUdpLogger.prototype.getMachineName = function()
{
	return 'UK1PC114';
};

Log4jUdpLogger.prototype.getLogger = function()
{
	return 'logger';
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(Log4jUdpLogger, winston.Transport);
winston.transports.Log4jUdpLogger = Log4jUdpLogger;

Log4jUdpLogger.prototype.log = function (level, msg, meta, callback) {

	var messageText = this.layout.format({
		level: level, 
		msg: msg, 
		meta: meta, 
		logger: 'logger', //this.getLogger(),
		app: this.app,
		machineName: this.machineName,
		timestamp: +new Date()
	});

	var message = new Buffer(messageText);

	this.udpClient.send(message, 0, message.length, this.port, this.host, function(err, bytes) {
		if (err) throw err;
	});

	callback(null, true);
};