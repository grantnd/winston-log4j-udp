winston-log4j-udp
=================

This module enables the transmission of [Winston](https://github.com/flatiron/winston) logging events to networked log aggregation and viewing tools that can receive log4j 1.2 events via UDP. Examples of these are [Apache Chainsaw](http://logging.apache.org/chainsaw/) and [LogFaces](http://www.moonlit-software.com/).

It implements the functionality (but not the interface) of the Java [org.apache.log4j.net.UDPAppender class](http://logging.apache.org/log4j/companions/receivers/apidocs/org/apache/log4j/net/UDPAppender.html). This includes the ability to specify a [Layout](http://logging.apache.org/log4j/1.2/apidocs/index.html) for the message, which is simply a text formatter. Currently the only layout available is the XMLLayout.

Usage
-----

Installation
------------

