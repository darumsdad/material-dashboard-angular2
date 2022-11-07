import { Contact } from "./contact";
import { Event } from "./event";
import { EventContactDecorator } from "./event-contact-decorator";



export class EventContact {

    constructor(

    ) { }

    public id?: any
    public gid?: any
    public event?: Event
    public eventId: any
    public contact?: Contact
    public contactId: any

    public decorators?: EventContactDecorator[]

   

 




}
