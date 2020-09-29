import axios, { AxiosResponse } from 'axios';
import { JiraUser } from '../models/User';

axios.defaults.baseURL = "https://jira.smart-digital.de/rest/api/2";

// axios.interceptors.request.use(
//     config => {
//         const token = window.localStorage.getItem('jwt');
//         if (token) config.headers.Authorization = `Bearer ${token}`;
//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );

axios.interceptors.response.use(undefined, error => {
    // const { status, data, config, headers } = error.response;
    console.log(error);    
  });

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    post: (url: string, body: {}, header: {}) =>
        axios
            .post(url, body, {
                headers: header
            })
            .then(responseBody),
    get: (url: string, header: {}) =>
        axios
            .get(url, {
                headers: header
            })
            .then(responseBody),
}

const Jira = {
    issue: (user: JiraUser, issue: string): Promise<any> => requests.get(`/issue/SMAR-2627`, crateHeader(user)),

    accountId: (user: JiraUser): Promise<any> => requests.get("user/bulk/migration", crateHeader(user))
}
 const crateHeader = (user: JiraUser): any => {
     var hash = Buffer.from(user.username+":"+user.password).toString('base64');
    return {
        'Authorization': `Basic ${hash}`,
        'Accept': 'application/json'
      }
 }

export default {
    Jira
  };
  