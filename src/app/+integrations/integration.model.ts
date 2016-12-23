export class IIntegration {
  id: number;
  configuredProperties: any;
  createdBy: string;
  createdOn: Date;
  description: string;
  icon: string;
  modifiedBy: string;
  modifiedOn: Date;
  name: string;
  position: string;
  type: string;

  constructor() {
    this.id = 0;
    this.createdBy = '';
    this.createdOn = new Date();
    this.configuredProperties = {};
    this.description = '';
    this.icon = '';
    this.modifiedBy = '';
    this.modifiedOn = new Date();
    this.name = '';
    this.position = '';
    this.type = '';
  }
}
