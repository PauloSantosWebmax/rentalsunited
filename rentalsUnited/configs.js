
module.exports = {
    endpoint: 'http://rm.rentalsunited.com/api/Handler.ashx',
    options: {
        headers: { 
            'Accept': 'text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5',
            'Accept-Language': 'en-us',
            'Accept-Charset': 'SO-8859-1,utf-8;q=0.7,*;q=0.7',
            'Keep-Alive': '300',
            'Connection': 'keep-alive'
        }
    },
    credentials: {
        user: process.env.RU_USERNAME,
        pass: process.env.RU_PASSWORD
    }
}