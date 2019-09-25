import {environment} from '../../environments/environment';

export class UrlConstants {
    public static URL_CLASSROOM = environment.apiUrl + '/api/classrooms';
    public static URL_TYPE_OF_CLASSROOM = environment.apiUrl + '/api/types_of_classroom';
    public static URL_TEACHER = environment.apiUrl + '/api/teachers';
    public static URL_TEACHER_REPORT = environment.apiUrl + '/api/report/teachers';
    public static URL_DISCIPLINE_REPORT =  environment.apiUrl + '/api/report/disciplines';
    public static URL_DISCIPLINE = environment.apiUrl + '/api/disciplines';
    public static URL_TYPE_OF_EMPLOYMENT = environment.apiUrl + '/api/types_of_employment';
    public static URL_TYPE_OF_COURSE = environment.apiUrl + '/api/types_of_course';
    public static URL_TYPE_OF_WORK = environment.apiUrl + '/api/types_of_work';
    public static URL_TYPE_OF_EDUCATION = environment.apiUrl + '/api/types_of_education';
    public static URL_TYPE_OF_POSITION = environment.apiUrl + '/api/types_of_position';
    public static URL_EMPLOYEE = environment.apiUrl + '/api/employees';
    public static URL_DEPARTMENT = environment.apiUrl + '/api/departments';
    public static URL_GROUP = environment.apiUrl + '/api/groups';
    public static URL_DESCRIPTION_OF_PLAN = environment.apiUrl + '/api/description_of_plans';
    public static URL_TIMETABLE_OF_CLASSES = environment.apiUrl + '/api/timetable_of_classes';
}
