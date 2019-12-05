import {Time} from '@angular/common';
import {Group, GroupDto} from './group.model';
import {Discipline} from './discipline.model';
import {Classroom, ClassroomDto} from './classroom.model';
import {Teacher, TeacherDto} from './teacher.model';
import {TypeOfWork} from './course.model';

export class TimetableOfClasses {
    public id: number;
    public classDate: Date;
    public beginTime: Time;
    public finishTime: Time;
    public pairNumber: number;
    public lessonNumber: number;
    public groupDto: Group;
    public subgroup: number;
    public typeOfWork: TypeOfWork;
    public disciplineDto: Discipline;
    public classroomDto: Classroom;
    public teacherDto: Teacher;
    public status: boolean;
    public reserved: boolean;

}

export class TimetableOfClassesForEvents {
    timetableOfClassesDto: TimetableOfClasses;
    need: number;
}

export class ExternalEvent {
    title: string;
    description: string;
    objectData: TimetableOfClasses;
    need: number;
}

export class TimetableOfClassesDto {
    public id: number;
    public classDate: Date;
    public beginTime: Time;
    public finishTime: Time;
    public pairNumber: number;
    public lessonNumber: number;
    public groupDto: GroupDto;
    public subgroup: number;
    public typeOfWork: string;
    public disciplineDto: Discipline;
    public classroomDto: ClassroomDto;
    public teacherDto: TeacherDto;
    public status: boolean;
    public reserved: boolean;
}

export class NewEvent {
    id: number;
    title: string;
    day: Date;
    startTime: Time;
    endTime: Time;
    classroom: Classroom;
    teacher: Teacher;
    group: Group;
    typeOfWork: TypeOfWork;
    discipline: Discipline;
    subgroup: number;
    status: boolean;
    public reserved: boolean;
}
