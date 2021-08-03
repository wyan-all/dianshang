
import Mock from 'mockjs'

/* eslint-disable quote-props */
var template = {
  'code': '200',
  'message': '请求成功',
  'result': {

    'results|20': [
      {
        'traceId': '@guid',
        'seqno': '-1',
        'request': '\'{\'customerId\':\'203509\',\'domain\':\'changdu.gov.cn\',\'domainName\':\'www\',\'openType\':0,\'wafProtocolType\':0,\'wafSourceIp\':\'113.62.176.97\',\'wafSourcePort\':\'80\'}\'',
        'response': '\'<html>\r\n<head><title>504GatewayTime-out</title></head>\r\n<bodybgcolor=\'white\'>\r\n<center><h1>504GatewayTime-out</h1></center>\r\n<hr><center>nginx</center>\r\n</body>\r\n</html>\r\n\'',
        'begin': '@natural',
        'end': '@natural',
        'url': '/api/v2/wafConfig/closePort',
        'spendMS': '@integer(60, 900000)',
        'beginMs': '@natural',
        'endMs': '@natural',
        'component': 'zyuc',
        'module': '',
        'httpMethod': 'POST',
        'userId': '@ip',
        'source': 'nginx',
        'status': '504',
        'customerName': '天翼云专用对接帐号',
        'object': '1',
        'customerId': 'Contr_CTYunAPI',
        'userAgent': 'Apache-HttpClient/4.5.2(Java/1.8.0_131)',
        'tonce': /\d{5,10}/,
        'accesskey': '8334a8f304591e3cbc3fbde61f8778f2'
      }
    ],
    'totalCount': 20
  }

}
var template2 = {
  'code': '200',
  'message': '请求成功',
  'result': {

    'results|10': [
      {
        'traceId': '@guid',
        'seqno': '-1',
        'request': '\'{\'customerId\':\'203509\',\'domain\':\'changdu.gov.cn\',\'domainName\':\'www\',\'openType\':0,\'wafProtocolType\':0,\'wafSourceIp\':\'113.62.176.97\',\'wafSourcePort\':\'80\'}\'',
        'response': '\'<html>\r\n<head><title>504GatewayTime-out</title></head>\r\n<bodybgcolor=\'white\'>\r\n<center><h1>504GatewayTime-out</h1></center>\r\n<hr><center>nginx</center>\r\n</body>\r\n</html>\r\n\'',
        'begin': '@natural',
        'end': '@natural',
        'url': '/api/v2/wafConfig/closePort',
        'spendMS': '@integer(60, 900000)',
        'beginMs': '@natural',
        'endMs': '@natural',
        'component': 'zyuc',
        'module': '',
        'httpMethod': 'POST',
        'userId': '@ip',
        'source': 'nginx',
        'status': '504',
        'customerName': '天翼云专用对接帐号',
        'object': '1',
        'customerId': 'Contr_CTYunAPI',
        'userAgent': 'Apache-HttpClient/4.5.2(Java/1.8.0_131)',
        'tonce': /\d{5,10}/,
        'accesskey': '8334a8f304591e3cbc3fbde61f8778f2'
      }
    ],
    'totalCount': 10
  }

}
Mock.mock(/\/api\/api/, 'get', template)
Mock.mock(/\/api\/api2/, 'get', template2)// url要写成这种形式，不能是字符串的形式，否则会报错404，且get要是小写
export default Mock
