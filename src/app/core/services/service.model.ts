export class Service {
    public count: number;
    public icon: string;
    public id: number;
    public title: string;

    constructor(count: number, icon: string, id: number, title: string) {
        this.count = count;
        this.icon = icon;
        this.id = id;
        this.title = title;
    }
}