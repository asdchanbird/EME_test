const data = () => {
  return {
    message: 'Success',
    data:  [
    {
        id: 1231,
        width: 300,
        height: 200,
        x: 20,
        y: 20,
    }, {
        id: 3213,
        width: 300,
        height: 200,
        x: 20,
        y: 240,
    }, {
        id: 8888,
        width: 400,
        height: 250,
        x: 20,
        y: 460,
    },
]
  }
}

export default defineEventHandler(async (event) => {
  return new Promise((resolve, reject) => {
    
    setTimeout(() => {
      resolve(data())
    }, 500)
  })
})