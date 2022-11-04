import { Contact } from "./contact";
import { Event } from "./event";
import { EventContactDecorator } from "./event-contact-decorator";

export class EventContact {

    constructor(

    ) { }

    public id: number
    public event: Event
    public contact: Contact
    public decorators: EventContactDecorator[]

    getType(): string {
        console.log('getType')
        console.log(this)


        if (!this.decorators) {
            console.log('help')
            return null
        }


        console.log(this.decorators)
        const found = this.decorators.find(x => {
            console.log('getTypei')
            console.log(x.type)
            console.log(x.type === "contact-type")
            return x.type === "contact-type"
        })
        console.log(found)
        return found.decorator.decoratorString
    }

    isPrimary(): boolean {
        console.log('isPrimary')
        console.log(this.decorators)

        if (!this.decorators)
            return false;

        return this.decorators.some(x => {


            return x.type === "primary-contact-indicator"
        })

    }




}
