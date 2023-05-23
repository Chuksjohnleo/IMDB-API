import https from 'https';
import fs from 'fs';
 
const apiKey = process.env.IMDB_API_KEY;
 
export default function handler(request, response) {
  // fs.readFile('body.txt', 'utf-8', (e, r)=>{
  //   console.log(r,'ok');
  //   response.json(JSON.parse(r))
  // })
    console.log(request.body)
if(request.method === 'POST'){
let options = {
        'method': 'GET',
        'hostname': 'imdb-api.com',
        'port': 443,
        'path': `https://imdb-api.com/${request.body.language}/API/SearchMovie/${apiKey}/${request.body.query.split(' ').join('-')}`,
        // 'path': `https://imdb-api.com/${request.body.language}/API/SearchSeries/${apiKey}/${request.body.query}`,
        // 'path': `/${request.body.language}/API/Title/${apiKey}/${request.body.title}`,
        'headers': {
        },
        'maxRedirects': 20
      };
console.log(options.path)
const req = https.request(options, function (res) {
  let chunks = [];
 
  res.on("data", function (chunk) {
    chunks.push(chunk);
  });
 
  res.on("end", function (chunk) {
    let body = Buffer.concat(chunks);
    response.json(JSON.parse(body))
    // fs.writeFile('search.txt', body, (e)=>{
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