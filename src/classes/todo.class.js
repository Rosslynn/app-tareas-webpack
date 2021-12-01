export class Task {

    constructor(name) {
        this.id = new Date().getTime();
        this.name = name;
        this.completed = false;
        this.created_at = new Date();
    }

}