import {apiRoot,apiRot,apiRotL,apiRotR,apiRotMovie,h5Callback} from './config'

let wxApiUrl = {}
wxApiUrl.PostHome = apiRoot//请求执行的地址
wxApiUrl.getHome = apiRot
wxApiUrl.getLD = apiRotL
wxApiUrl.getR = apiRotR
wxApiUrl.getMovie = apiRotMovie
wxApiUrl.h5Callback = h5Callback

export default wxApiUrl
