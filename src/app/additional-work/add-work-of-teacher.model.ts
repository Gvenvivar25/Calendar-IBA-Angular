import {Teacher, TeacherDto} from '../dictionaries/teachers/teacher.model';
import {Group, GroupDto} from '../dictionaries/groups/group.model';

export class AddWorkOfTeacher {
    public id: number;
    public date: Date;
    public teacherDto: Teacher;
    public groupDto: Group;
    public typeOfAddWork: TypeOfAddWork;
    public hour: number;

}

export class TypeOfAddWork {
    public id: string;
    public value: string;
    public short_value: string;

}

export class AddWorkOfTeacherDto {
    public id: number;
    public date: Date;
    public teacherDto: TeacherDto;
    public groupDto: GroupDto;
    public typeOfAddWork: string;
    public hour: number;

}
