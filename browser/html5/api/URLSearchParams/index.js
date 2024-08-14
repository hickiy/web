var url =
  'http://localhost/sso.html?code=IWsGtLqtOQ+py/xlqrmhWllqqY/4/z/ukrkzVT6Gri/7enP/TRyGUhbYUGvxTr9QIqGQmwT/Zoi66w8KmIhCxQ==&fdId=189d9d9fd53b696479547434486ac618&serverurl=https%3A%2F%2Fportaltest.ionrocking.com%2Fbattery-lease-sys%2Fcommon%2Fbattery%2Flist%3FpurchasePaymentId%3Ddfe8c2464868b40b&failUrl=https%3A%2F%2Fportal.ionrocking.com%2Flogin';
var urlObj = new URL(url);
var code = urlObj.search.match(/code=([^&]+)/)[1];
var fdId = urlObj.searchParams.get('fdId');
var serverurl = urlObj.searchParams.get('serverurl');
var failUrl = urlObj.searchParams.get('failUrl');
console.log('\n', code, '\n', fdId, '\n', serverurl, '\n', failUrl);
