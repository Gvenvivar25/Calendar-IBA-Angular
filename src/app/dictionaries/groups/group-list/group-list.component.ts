import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Group} from '../../../shared/models/group.model';
import {GroupService} from '../../../shared/services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

    groups: Group [];
  //  descOfPlanName: string [];

    constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this. loadGroups();
    }

    loadGroups() {
        return this.groupService.getGroups()
            .subscribe((data: Group[]) => {
                this.groups = data;
              /*  this.descOfPlanName = [];
                for (let i = 0, len = this.groups.length; i < len; i++) {
                   this.groupService.getDiscriptionOfPlan(this.groups[i].id_descriptionOfPlan)
                        .subscribe(res => this.descOfPlanName.push(res.description)); }*/
            });
    }


    onDelete(group: Group) {
        this.groupService.deleteGroup(group.id).subscribe(() => {
            this.loadGroups();
        });
    }

    onAdd() {
        this.router.navigate(['./add'], {relativeTo: this.route});
    }
}
