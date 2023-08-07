// const data = async() => {
//     const { data, pending, error, refresh } = await useFetch('/ReadAll', {
//         // server: false,
//         method: 'GET',
//         baseURL: 'https://192.168.36.52:8443/DashboardManagementAPI/DashboardDesignGroup'
//     })
//     console.log(data)
//     return data.value
// }
// export default defineEventHandler(async (event) => {
//   return new Promise((resolve, reject) => {
    
//     setTimeout(() => {
//         console.log(data())
//       resolve(data())
//     }, 1000)
//   })
// })