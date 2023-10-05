import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const Ivanti = {
  createTickets: async (req) => {
    const { body, headers } = req
    const createTicketsIvantiResult = []
    await Promise.allSettled(
      body.map(async (ticket) => {
        delete ticket.IncidentNumber
        const importIvantiResult = await axios.post(`${process.env.IVANTI_PROVIDER_URL}/odata/businessobject/incidents`,
          JSON.stringify(ticket),
          {
            headers: {
              'content-type': 'application/json',
              Authorization: headers.authorization
            }
          })

        createTicketsIvantiResult.push(
          {
            ...ticket, IncidentNumber: importIvantiResult.data.IncidentNumber || 0
          }
        )
      })
    )
    return createTicketsIvantiResult
  }
}
