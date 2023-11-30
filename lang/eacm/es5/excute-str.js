'use strict';
eval('console.log(this)');
new Function('console.log(this)')();
setTimeout('console.log(this)');
