import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Group} from '../group.model';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

    groups: Group [];
    constructor(private groupService: GroupService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this. loadGroups();
    }

    loadGroups() {
        return this.groupService.getGroups()
            .subscribe((data: Group[]) => {
                this.groups = data;
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
