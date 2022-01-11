import { fetchWithToken } from '../helpers/fetch.js';

export default class Logs {
  async logsToTxt() {
    const data = await fetchWithToken('POST', 'http://localhost:4000/super/logs', localStorage.getItem('token'));
    let type;
    let result = '';
    if (data.logs && data.logs.length > 0) {
      for (let log of data.logs) {
        const createdAt = new Date(log.createdAt).toISOString().substring(0, 10);
        result += `
  
    Role : ${log.userRole}   |   Action : ${log.action}   |   Message : ${log.msg}   |   Created at : ${createdAt}
    
    `
      }
      var file = new Blob([result], [type = "text"]);
      var anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(file);
      anchor.download = `logs.txt`;
      anchor.click();
      return data;
    } else {
      console.log(data.message);
    }
  }
}