
// 给axios添加跨域请求
import axios from 'axios';
export const baseUrl = 'http://10.3.136.170:3000'
export const apiUrl = `${baseUrl}`
// 创建一个axios实例
const instance = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  // 这里的代码在当前文件被import时执行
  // headers:{
  //     Authorization:null
  // }
});

// 请求拦截（请求发出去前的操作）拦截器interceptors
instance.interceptors.request.use((config) => {
  // config：axios的配置参数
  let userInfo = localStorage.getItem("userInfo");
  try {
    userInfo = JSON.parse(userInfo) || {};
  } catch {
    userInfo = {};
  }
  config.headers.Authorization = userInfo.authorization;

  // 返回修改后的配置参数
  return config;
})
 
export default instance;