export class IComponent {
    id: number;
    name: string;
    description: string;
    type: string;
    icon: string;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
    
    constructor() {
        this.id = 0;
        this.name = '';
        this.description = '';
        this.type = '';
        this.icon = '';
        this.createdOn = new Date();
        this.createdBy = "";
        this.modifiedOn = new Date();
        this.modifiedBy = "";
    }
}
