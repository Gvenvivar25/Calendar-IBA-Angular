import { Component, OnInit } from '@angular/core';
import {ReportService} from './report.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import * as fileSaver from 'file-saver';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportForm: FormGroup;
  formats: string[] = ['XLSX', 'PDF', 'DOC'];

  filenames: Filename[] = [ {id: 'teachers', name: 'Отчет по преподавателям'}, {id: 'disciplines', name: 'Отчет по предметам'}];
    filename;
    blob;
    format;

    constructor( private reportService: ReportService, private route: ActivatedRoute, private router: Router,
                 ) {
      this.reportForm = this.createFormGroup();


  }
    createFormGroup() {
        return new FormGroup({
            format: new FormControl('XLSX', Validators.required)
        });
    }

  ngOnInit() {

  }

    download() {
        this.reportService.downloadReport(this.format, this.filename)
            .subscribe(response => {

                console.log(this.format, this.filename)
                if (this.format === 'XLSX') {
                    this.blob = new Blob([response], {type: 'application/xlsx'});
                    fileSaver.saveAs(this.blob, this.filename + '.' + this.format);
                }
                if (this.format === 'PDF') {
                    this.blob = new Blob([response], {type: 'application/pdf'});
                    fileSaver.saveAs(this.blob, this.filename + '.' + this.format);
                }

                /*this.blob = new Blob([response], {type: 'application/xlsx'});
                console.log(this.blob);*/

                /*const downloadURL = URL.createObjectURL(response);
                window.open(downloadURL);*/
              //  fileSaver.saveAs(this.blob, this.filename);
            });
    }

    /*getTeachersReport() {
        const result: any = Object.assign({}, this.reportForm.value);
        this.selectedFormat = result.format;
        console.log(this.selectedFormat);
        this.reportService.getTeachersReport(this.selectedFormat, 'teachersReport').subscribe();

    }

    getDisciplinesReport() {
        const result: any = Object.assign({}, this.reportForm.value);
        this.selectedFormat = result.format;
        console.log(this.selectedFormat);
        this.reportService.getDisciplinesReport(this.selectedFormat, 'disciplinesReport').subscribe();
    }*/

}

export class Filename {
    public id: string;
    public name: string;

}
