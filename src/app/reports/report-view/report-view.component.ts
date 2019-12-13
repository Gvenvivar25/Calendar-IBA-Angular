import { Component, OnInit } from '@angular/core';
import {ReportService} from '../report.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Group} from '../../shared/models/group.model';
import {Teacher} from '../../shared/models/teacher.model';
import {GroupService} from '../../shared/services/group.service';
import {TeachersService} from '../../shared/services/teachers.service';
import {Classroom} from '../../shared/models/classroom.model';
import {ClassroomService} from '../../shared/services/classroom.service';
import * as fileSaver from 'file-saver';
import {AuthenticationService} from '../../shared/services/authentication.service';


@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit {
    blob;
    format = 'PDF';
    formats: string[] = ['XLSX', 'PDF', 'DOC'];
    group;
    groups: Group[];
    teacher;
    teachers: Teacher[];
    classroom;
    classrooms: Classroom[];
    startDate;
    endDate;

    reportName: string;
    isPeriod: boolean;
    isGroup: boolean;
    isTeacher: boolean;
    isClassroom: boolean;

    url;



  constructor(private reportService: ReportService, private groupService: GroupService, private teacherService: TeachersService,
              private classroomService: ClassroomService,
              private route: ActivatedRoute, private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit() {
      const date = new Date();
      this.startDate = new Date(date.getFullYear(), date.getMonth() , 2).toISOString().split('T')[0];
      this.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().split('T')[0];
      this.reportName = this.route.snapshot.params.name;
      if (this.isUserRole) {
          this.teacher = 11;
      }
      if (this.isGroupRole) {
          this.group = 1;
      }
      switch (this.reportName) {
          case 'report02015':
          case 'timetable': {
              this.isPeriod = true;
              this.isGroup = false;
              this.isTeacher = false;
              this.isClassroom = false;
              break;
          }
          case 'report-group02015':
          case 'report-groupClasses':
          case 'timetable-group': {
              this.isPeriod = true;
              this.isGroup = true;
              this.isTeacher = false;
              this.isClassroom = false;
              break;
          }
          case 'report-teacher02015':
          case 'timetable-teacher': {
              this.isPeriod = true;
              this.isGroup = false;
              this.isTeacher = true;
              this.isClassroom = false;
              break;
          }
          case 'timetable-classroom': {
              this.isPeriod = true;
              this.isGroup = false;
              this.isTeacher = false;
              this.isClassroom = true;
              break;
          }
          case 'disciplines':
          case 'groups':
          case 'teachers': {
              this.isPeriod = false;
              this.isGroup = false;
              this.isTeacher = false;
              this.isClassroom = false;
              break;
          }

      }
      this.groupService.getGroups().subscribe((res: Group[]) => {
          this.groups = res;
      });
      this.teacherService.getTeachers().subscribe((res: Teacher[]) => {
          this.teachers = res;
      });
      this.classroomService.getClassrooms().subscribe((res: Classroom[]) => {
          this.classrooms = res;
      });

  }
    get isUserRole() {
        // const role = this.authService.getUserRole();
        const role = this.authService.userRole;
        if (role === 'ROLE_USER') { return true; } else { return false; }
    }

    get isGroupRole() {
        // const role = this.authService.getUserRole();
        const role = this.authService.userRole;
        if (role === 'ROLE_GROUP') { return true; } else { return false; }
    }
    gotoReportList() {
        this.router.navigate(['/reports']);
    }

    createFile(response) {
        if (this.format === 'XLSX') {
            this.blob = new Blob([response], {type: 'application/xlsx'});
            fileSaver.saveAs(this.blob, this.reportName + '.' + this.format);
        }
        if (this.format === 'DOCX') {
            this.blob = new Blob([response], {type: 'application/docx'});
            fileSaver.saveAs(this.blob, this.reportName + '.' + this.format);
        }
        if (this.format === 'PDF') {
            this.blob = new Blob([response], {type: 'application/pdf'});
            fileSaver.saveAs(this.blob, this.reportName + '.' + this.format);
        }
    }

    showFile(response) {
        /*if (this.format === 'XLSX') {
            this.blob = new Blob([response], {type: 'application/xlsx'});
            fileSaver.saveAs(this.blob, this.reportName + '.' + this.format);
        }
        if (this.format === 'DOC') {
            this.blob = new Blob([response], {type: 'application/doc'});
            fileSaver.saveAs(this.blob, this.reportName + '.' + this.format);
        }
        if (this.format === 'PDF') {
            this.blob = new Blob([response], {type: 'application/pdf'});
            const objUrl = URL.createObjectURL(this.blob);
            const iframe = document.getElementById('viewer');
            iframe.setAttribute('src', objUrl);
            URL.revokeObjectURL(objUrl);

        }*/
        this.blob = new Blob([response], {type: 'application/pdf'});
        const objUrl = URL.createObjectURL(this.blob);
        const iframe = document.getElementById('viewer');
        iframe.setAttribute('src', objUrl);
        URL.revokeObjectURL(objUrl);
    }

    download(format) {
       // console.log(this.startDate, this.endDate);
        this.format = format;
        switch (this.reportName) {
            case 'timetable': {
                this.reportService.downloadAllTimetableForPeriod(this.format, this.reportName, this.startDate, this.endDate).
                subscribe(response => {
                    this.createFile(response);
                });
                break;
            }
            case 'timetable-teacher': {
                this.reportService.downloadTimetableForTeacherForPeriod(this.format, this.reportName, this.teacher, this.startDate,
                    this.endDate).
                subscribe(response => {
                    this.createFile(response);
                });
                break;
            }
            case 'timetable-group': {
                this.reportService.downloadTimetableForGroupForPeriod(this.format, this.reportName, this.group, this.startDate,
                    this.endDate).
                subscribe(response => {
                    this.createFile(response);
                });
                break;
            }
            case 'teachers':
            case 'groups':
            case 'disciplines': {
                this.reportService.downloadReport(this.format, this.reportName)
                    .subscribe(response => {
                        this.createFile(response);
                    });
                break;
            }
            case 'report02015': {
                this.reportService.downloadReportForm02015(this.format, this.reportName, this.startDate, this.endDate).
                subscribe(response => {
                    this.createFile(response);
                });
                break;
            }
            case 'report-teacher02015': {
                this.reportService.downloadReportForm02015ForTeacher(this.teacher, this.format, this.reportName, this.startDate,
                    this.endDate).
                subscribe(response => {
                    this.createFile(response);
                });
                break;
            }
            case 'report-group02015': {
                this.reportService.downloadReportForm02015ForGroup(this.group, this.format, this.reportName, this.startDate,
                    this.endDate).
                subscribe(response => {
                    this.createFile(response);
                });
                break;
            }
            case 'report-groupClasses': {
                this.reportService.downloadReportGroupConsolidated(this.group, this.format, this.reportName, this.startDate,
                    this.endDate).
                subscribe(response => {
                    this.createFile(response);
                });
                break;
            }
        }
    }

    showPDF() {
        switch (this.reportName) {
            case 'timetable': {
                this.reportService.downloadAllTimetableForPeriod(this.format, this.reportName, this.startDate, this.endDate).
                subscribe(response => {
                    this.showFile(response);
                });
                break;
            }
            case 'timetable-teacher': {
                console.log(this.teacher);
                this.reportService.downloadTimetableForTeacherForPeriod(this.format, this.reportName, this.teacher, this.startDate,
                    this.endDate).subscribe(response => {
                    this.showFile(response);
                });
                break;
            }
            case 'timetable-group': {
                console.log(this.group);
                this.reportService.downloadTimetableForGroupForPeriod(this.format, this.reportName, this.group, this.startDate,
                    this.endDate).subscribe(response => {
                    this.showFile(response);
                });
                break;
            }
            case 'teachers':
            case 'groups':
            case 'disciplines': {
                this.reportService.downloadReport(this.format, this.reportName)
                    .subscribe(response => {
                        this.showFile(response);
                    });
                break;
            }
            case 'report02015': {
                this.reportService.downloadReportForm02015(this.format, this.reportName, this.startDate, this.endDate).
                subscribe(response => {
                    this.showFile(response);
                });
                break;
            }
            case 'report-teacher02015': {
                this.reportService.downloadReportForm02015ForTeacher(this.teacher, this.format, this.reportName, this.startDate,
                    this.endDate).
                subscribe(response => {
                    this.showFile(response);
                });
                break;
            }
            case 'report-group02015': {
                this.reportService.downloadReportForm02015ForGroup(this.group, this.format, this.reportName, this.startDate,
                    this.endDate).
                subscribe(response => {
                    this.showFile(response);
                });
                break;
            }
            case 'report-groupClasses': {
                this.reportService.downloadReportGroupConsolidated(this.group, this.format, this.reportName, this.startDate,
                    this.endDate).
                subscribe(response => {
                    this.showFile(response);
                });
                break;
            }
        }
    }
}

