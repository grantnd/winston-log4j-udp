winston-log4j-udp
=================

Motivation
----------

This module was created to enable the transmission of [Winston](https://github.com/flatiron/winston) logging events to networked log aggregation and viewing tools that can consume log4j 1.2 events via UDP. Examples of these tools are [Apache Chainsaw](http://logging.apache.org/chainsaw/) and [LogFaces](http://www.moonlit-software.com/), however any UDP server could be targeted.

It implements the functionality (but not the interface) of the Java [org.apache.log4j.net.UDPAppender class](http://logging.apache.org/log4j/companions/receivers/apidocs/org/apache/log4j/net/UDPAppender.html). This includes the ability to specify a [Layout](http://logging.apache.org/log4j/1.2/apidocs/index.html), which will convert the event to formatted text for transmission. Currently the only layout implemented by the module is the XMLLayout, whose output conforms to [this dtd](https://github.com/grantnd/winston-log4j-udp/blob/master/layouts/log4j.dtd).

Usage
-----

Waiting for 0.1 release

Installation
------------

Waiting for 0.1 release