#!/bin/sh

yarn creevey
retval=$?
if [ $retval -ne 0 ]
then
  yarn creevey --update
fi
exit $retval
