import { Moment } from "moment"

export class Gig {
    id?: any
    description: string
    note: string
    quote: string
    venueId: number
    statusId: number
    typeId: number
    dateTime: Moment
}
