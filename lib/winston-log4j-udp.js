var util = require('util'),
	winston = require('winston'),
	dgram = require('dgram');
	os = require('os');
	XmlLayout = require('./layouts/xml');

var Log4jUdpLogger = winston.transports.Log4jUdpLogger = function (options) {

	this.name = 'winston-log4j-udp';

	this.level = options.level || 'info';

	this.app = options.app;
	this.host = options.host;
	this.port = options.port;

	if(options.layout)
	{
		switch(options.layout.toLowerCase())
		{
			case 'xml':
				this.layout = new XmlLayout();
			default:
				throw new Exception('Invalid layout was specified: ' + layoutName)
		}
	}
	else
	{
		this.layout = new XmlLayout();
	}
	
	this.machineName = os.hostname();
		
	this.udpClient = dgram.createSocket('udp4');
};

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(Log4jUdpLogger, winston.Transport);

Log4jUdpLogger.prototype.getLogger = function()
{
	return 'logger';
};

Log4jUdpLogger.prototype.log = function (level, msg, meta, callback)
{
	var messageText = this.layout.format({
		level: level, 
		msg: msg, 
		meta: meta, 
		logger: this.getLogger(),
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