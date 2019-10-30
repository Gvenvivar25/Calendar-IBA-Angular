import { Component, OnInit } from '@angular/core';
import {ReportService} from '../report.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Group} from '../../dictionaries/groups/group.model';
import {Teacher} from '../../dictionaries/teachers/teacher.model';
import {GroupService} from '../../dictionaries/groups/group.service';
import {TeachersService} from '../../dictionaries/teachers/teachers.service';
import {Classroom} from '../../dictionaries/classrooms/classroom.model';
import {ClassroomService} from '../../dictionaries/classrooms/classroom.service';
import * as fileSaver from 'file-saver';


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
              private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      this.reportName = this.route.snapshot.params.name;
      switch (this.reportName) {
          case 'report02015':
          case 'timetable': {
              this.isPeriod = true;
              this.isGroup = false;
              this.isTeacher = false;
              this.isClassroom = false;
              break;
          }
          case 'timetable-group': {
              this.isPeriod = true;
              this.isGroup = true;
              this.isTeacher = false;
              this.isClassroom = false;
              break;
          }
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

    createFile(response) {
        if (this.format === 'XLSX') {
            this.blob = new Blob([response], {type: 'application/xlsx'});
            fileSaver.saveAs(this.blob, this.reportName + '.' + this.format);
        }
        if (this.format === 'DOC') {
            this.blob = new Blob([response], {type: 'application/doc'});
            fileSaver.saveAs(this.blob, this.reportName + '.' + this.format);
        }
        if (this.format === 'PDF') {
            this.blob = new Blob([response], {type: 'application/pdf'});
            fileSaver.saveAs(this.blob, this.reportName + '.' + this.format);
        }
    }

    showFile(response) {
        if (this.format === 'XLSX') {
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

        }
    }

    download() {
       // console.log(this.startDate, this.endDate);
        switch (this.reportName) {
            case 'timetable': {
                this.reportService.downloadAllTimetableForPeriod(this.format, this.reportName, this.startDate, this.endDate).
                subscribe(response => {
                    this.createFile(response);
                });
                break;
            }
            case 'timetable-teacher': {
                this.reportService.downloadTimetableForTeacherForPeriod(this.format, this.reportName, this.teacher, this.startDate, this.endDate).
                subscribe(response => {
                    this.createFile(response);
                });
                break;
            }
            case 'timetable-group': {
                this.reportService.downloadTimetableForGroupForPeriod(this.format, this.reportName, this.group, this.startDate, this.endDate).
                subscribe(response => {
                    this.createFile(response);
                });
                break;
            }
            case 'teachers':
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
        }
    }

    showPDF() {
        switch (this.reportName) {
            case 'timetable': {
                this.reportService.downloadAllTimetableForPeriod(this.format, this.reportName, this.startDate, this.endDate).subscribe(response => {
                    this.showFile(response);
                });
                break;
            }
            case 'timetable-teacher': {
                console.log(this.teacher);
                this.reportService.downloadTimetableForTeacherForPeriod(this.format, this.reportName, this.teacher, this.startDate, this.endDate).subscribe(response => {
                    this.showFile(response);
                });
                break;
            }
            case 'timetable-group': {
                console.log(this.group);
                this.reportService.downloadTimetableForGroupForPeriod(this.format, this.reportName, this.group, this.startDate, this.endDate).subscribe(response => {
                    this.showFile(response);
                });
                break;
            }
            case 'teachers':
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
        }
    }
}
