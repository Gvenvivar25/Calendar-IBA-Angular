import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-discipline-detail',
  templateUrl: './discipline-detail.component.html',
  styleUrls: ['./discipline-detail.component.css']
})
export class DisciplineDetailComponent implements OnInit {
  id: number;
  disciplineName: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.disciplineName = this.route.snapshot.params['disciplineName'];

      this.route.params.subscribe((params: Params) => {
          this.id = +params['id'];
          this.disciplineName = params['disciplineName'];
      });

  }

}
