import config from './config.json'
const enviroment = process.env.REACT_APP_NODE_ENV || 'development'
const enviromentAPI = config[enviroment]
export default enviromentAPI 

