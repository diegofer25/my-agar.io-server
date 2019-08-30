export default function ({ $axios, redirect, error }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 404 || code === 500) {
      redirect(`/error?status=${code}`)
    }
  })
}
