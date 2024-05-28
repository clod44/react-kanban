import { v4 as uuidv4 } from 'uuid';

class StageClass {
    constructor (title = "new stage", board = null) {
        this.id = uuidv4(); // Generate a unique ID
        this.title = title;
        this.color = "#000000";
        this.board = board;
    }
}
export default StageClass
