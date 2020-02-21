// axios: {    
//   proxy: true,    
//   prefix: '/api', 
//   // it only work when proxy is enabled
//   credentials: true,
// },  
// proxy: {    
//   '/api/proxy/douban': 
//   { target: 'https: //api.douban.com',     
//    changeOrigin: true,      
//    pathRewrite: { '^/api/proxy/douban': '' },
//   },    
//   '/api': {target: (IS_DEV || process.server)
//   ? 'http: //localhost:8000' : 'https: //lijun.space',      
//   changeOrigin: true,
//   },
// },