import { Component, OnInit } from '@angular/core';
import {ReportService} from './report.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reportForm: FormGroup;
  formats: string[] = ['XLSX', 'PDF', 'DOC'];
  selectedFormat: string;

    constructor( private reportService: ReportService, private route: ActivatedRoute, private router: Router) {
      this.reportForm = this.createFormGroup();


  }
    createFormGroup() {
        return new FormGroup({
            format: new FormControl('XLSX', Validators.required)
        });
    }

  ngOnInit() {

  }

    getTeachersReport() {
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
    }

}
