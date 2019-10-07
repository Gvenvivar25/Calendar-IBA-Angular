export class Teacher {
    public id: number;
    public lastName: string;
    public firstName: string;
    public patronymic: string;
    public typeOfEmployment: {id: string; value: string};
}

export class TeacherRequest {
    public teacherData: Teacher;
    public disciplinesData: any [];

}

export class Type {
    public id: string;
    public value: string;
}

export class TeacherDto {
    public id: number;
    public lastName: string;
    public firstName: string;
    public patronymic: string;
    public typeOfEmployment: string;
}
