import config from './config.json'
const enviroment = process.env.REACT_APP_HOST || 'development'
const enviromentAPI = config[enviroment]
export default enviromentAPI 

