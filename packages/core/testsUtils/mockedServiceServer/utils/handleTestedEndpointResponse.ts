// @ts-nocheck
export default function handleTestRequest(app) {
  return (req, res) => {
    console.log('incoming request:', req.url)
    switch (app.mode) {
      case 200: {
        console.log('----- send response: 200')
        res.send({
          data: 'data',
        })
        break
      }
      case 403: {
        console.log('----- send response: 403')
        res.sendStatus(403).send({
          status: 403,
        })
        break
      }
      case 500: {
        console.log('----- send response: 500')
        res.sendStatus(500).send({
          status: 500,
        })
        break
      }
    }
  }
}
