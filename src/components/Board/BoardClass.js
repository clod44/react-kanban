import { v4 as uuidv4 } from 'uuid';

class BoardClass {
    constructor (title = "new board") {
        this.id = uuidv4();
        this.title = title;
    }
}
export default BoardClass
