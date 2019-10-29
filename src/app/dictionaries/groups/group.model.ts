import {DescriptionOfPlan, DescriptionOfPlanDto} from '../courses/course.model';

export class Group {
    public id: number;
    public groupName: string;
    public numberOfSubgroup: number;
    public typeOfEducation: TypeOfEducation;
    public descriptionOfPlanDto: DescriptionOfPlan;
    public color: string;

}

export class TypeOfEducation {
    public id: string;
    public value: string;
    public short_value: string;
}

// модификация класса для возврата на сервер
export class GroupDto {
    public id: number;
    public groupName: string;
    public numberOfSubgroup: number;
    public typeOfEducation: string;
    public descriptionOfPlanDto: DescriptionOfPlanDto;
    public color: string;
}
