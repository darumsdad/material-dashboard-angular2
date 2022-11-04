import { Contact } from "./contact";
import { Event } from "./event";
import { EventContactDecorator } from "./event-contact-decorator";

export class EventContact {

   constructor(
        public id: number,
        public event: Event,
        public contact: Contact,
        public decorators: EventContactDecorator[]
    ) { }


}
