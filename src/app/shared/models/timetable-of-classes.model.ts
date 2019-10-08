import {Time} from '@angular/common';
import {Group} from '../../dictionaries/groups/group.model';
import {Discipline} from '../../dictionaries/disciplines/discipline.model';
import {Classroom} from '../../dictionaries/classrooms/classroom.model';
import {Teacher} from '../../dictionaries/teachers/teacher.model';

export class TimetableOfClasses {
    public id: number;
    public classDate: Date;
    public beginTime: Time;
    public finishTime: Time;
    public pairNumber: number;
    public lessonNumber: number;
    public groupDto: Group;
    public subgroup: number;
    public typeOfWork: string;
    public disciplineDto: Discipline;
    public classroomDto: Classroom;
    public teacherDto: Teacher;
    public status: boolean;

}
