const res = {
  data: {
    Home: { roles: null, title: '首页', },
    About: { roles: ['admin', 'visit'], title: '关于我们', disable: true },
    Server: { roles: ['unit'], title: '服务器', alwaysShow: true }
  },
  code: 200,
  msg: '',
}

const err = {
  code: 500,
  msg: 'error',
}

// 模拟请求
export const requset2 = () => {
  return new Promise((resolve, reject) => {
    const random = 1;
    if (random > .1) {
      setTimeout(() => {
        resolve(res)
      }, 500)
    } else {
      setTimeout(() => {
        reject(err)
      }, 500)
    }
  })
}