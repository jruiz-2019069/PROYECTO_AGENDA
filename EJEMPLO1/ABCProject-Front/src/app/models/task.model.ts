export class TaskModel{
    constructor(
        public _id: string,
        public title: string,
        public description: string,
        public priority: number,
        public complete: boolean
    ){}
}