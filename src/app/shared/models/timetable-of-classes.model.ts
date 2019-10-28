import {Time} from '@angular/common';
import {Group, GroupDto} from '../../dictionaries/groups/group.model';
import {Discipline} from '../../dictionaries/disciplines/discipline.model';
import {Classroom, ClassroomDto} from '../../dictionaries/classrooms/classroom.model';
import {Teacher, TeacherDto} from '../../dictionaries/teachers/teacher.model';
import {TypeOfWork} from '../../dictionaries/courses/course.model';

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
}
