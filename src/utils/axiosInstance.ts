import axios from 'axios';
let baseurl;
if(process.env.NODE_ENV!=='production') 
{
    baseurl = 'http://localhost:3000/api/v1/';
}
else{
    baseurl = process.env.AXIOS_APP_BASE_URL
}
export default axios.create({
    baseURL: baseurl
})