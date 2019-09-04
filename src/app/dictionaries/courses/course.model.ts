import {Discipline} from '../disciplines/discipline.model';

export class Course {
    public id: number;
    public courseName: string;
    public shortCourseName: string;
    public numberOfHours: number;

}
// ------------------------------------------------------------------------------------------

export class LessonPlan {
    public id: number;
    public numberOfHours: number;
    public typeOfWork: TypeOfWork;
    public discipline: Discipline;
    public descriptionOfPlan: DescriptionOfPlan;

}

export class TypeOfWork {
    public id: string;
    public value: string;
}

export class DescriptionOfPlan {
    public id: number;
    public description: string;
}


