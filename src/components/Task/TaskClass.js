import { v4 as uuidv4 } from 'uuid';

class TaskClass {
    constructor (title = "title", description = "description", stage = null) {
        this.id = uuidv4(); // Generate a unique ID
        this.title = title;
        this.description = description;
        this.stage = stage;
    }
}
export default TaskClass
