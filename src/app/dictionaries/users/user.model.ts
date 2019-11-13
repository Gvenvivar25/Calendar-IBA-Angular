export class User {
    public id: number;
    public username: string;
    public password: number;
    public lastName: string;
    public firstName: string;
    public patronymic: string;
    public email: string;
    public status: Status;
}

export class RoleDto {
    public id: number;
    public name: RoleName;
}

export class RoleName {
    id: string;
    value: string;
}

export class Status {
    public id: string;
    public value: string;
}
