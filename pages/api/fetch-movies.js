import https from 'https';
// import fs from 'fs';
 
const apiKey = process.env.IMDB_API_KEY;
 
export default function handler(request, response) {
    console.log(request.body)
if(request.method === 'POST'){
let options = {
        'method': 'GET',
        'hostname': 'imdb-api.com',
        'port': 443,
        'path': `https://imdb-api.com/${request.body.language}/API/Top250Movies/${apiKey}`,
        //'path': `https://imdb-api.com/${request.body.language}/API/SearchMovie/${apiKey}/${request.body.query}`,
        // 'path': `https://imdb-api.com/${request.body.language}/API/SearchSeries/${apiKey}/${request.body.query}`,
        // 'path': `/${request.body.language}/API/Title/${apiKey}/${request.body.title}`,
        'headers': {
        },
        'maxRedirects': 20
      };

const req = https.request(options, function (res) {
  let chunks = [];
 
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
 
  res.on("end", function () {
    let body = Buffer.concat(chunks);
    response.status(200).json(JSON.parse(body));
    console.log('body',body.toString())
    // fs.writeFile('fetch250.txt', body, (e)=>{
    //   if(e)console.log(e);
    //   console.log('done')
    // })
  });
 
  res.on("error", function (error) {
    console.error(error);
  });
});
 
  req.end();
 }
}