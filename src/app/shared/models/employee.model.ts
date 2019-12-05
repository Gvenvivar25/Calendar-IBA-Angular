import {Department} from './department.model';

export class Employee {
    public id: number;
    public lastName: string;
    public firstName: string;
    public patronymic: string;
    public typeOfPosition: TypeOfPosition;
    public startDate: Date;
    public endDate: Date;
    public departmentDto: Department;

}
export class TypeOfPosition {
    public id: string;
    public value: string;
}
