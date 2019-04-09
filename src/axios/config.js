
let config = {
// 请求接口地址
//   site: '192.168.0.134:8055',
  site: process.env.OPEX_API,
  siteM: process.env.PLUS_API,
  siteR: process.env.REBATE_API,

  // 域名后面的接口参数
  method: '/opex/hongbao',
  methodM: '/user/login/shareAuthorize',
  methodL: '/base/user/getUserNameById',
  methodR: '/rebate/user/getUserAccumulatedIncomeNoLogin',
  methodMovie: '/base/movie/getMovieTicketForMini',
  h5Callback: '/user/login/h5Callback'
}
export const apiRoot = config.site.concat(config.method);
export const apiRot = config.site.concat(config.methodM);
export const apiRotL = config.site.concat(config.methodL);
export const apiRotR = config.site.concat(config.methodR);
export const apiRotMovie = config.site.concat(config.methodMovie);
export const h5Callback = config.site.concat(config.h5Callback);
