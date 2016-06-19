#!/bin/sh

jade www/jade/index.jade -o www --pretty
sass --update www/scss/:www/css/