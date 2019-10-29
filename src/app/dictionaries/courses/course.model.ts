import {Discipline} from '../disciplines/discipline.model';
import {Teacher} from '../teachers/teacher.model';

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
    public disciplineDto: Discipline;
    public teacherDto: Teacher;
    public descriptionOfPlan: DescriptionOfPlan;

}

export class TypeOfWork {
    public id: string;
    public value: string;
    public short_value: string;
}

export class TypeOfCourse {
    public id: string;
    public value: string;
    public short_value: string;
}

export class DescriptionOfPlan {
    public id: number;
    public description: string;
    public typeOfCourse: TypeOfCourse;
}

// модификация класса для возврата на сервер
export class DescriptionOfPlanDto {
    public id: number;
    public description: string;
    public typeOfCourse: string;
}
