import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../group.service';
import {Group} from '../group.model';


@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent implements OnInit {

    groupEditForm: FormGroup;
    id: number;

    constructor(private groupService: GroupService, private route: ActivatedRoute, private router: Router) {
        this.groupEditForm = this.createFormGroup();
    }

    ngOnInit() {
        this.id = this.route.snapshot.params.id;
        this.getGroup(this.route.snapshot.params.id);
    }

    getGroup(id: number) {
        this.groupService.getGroup(id).subscribe(res => {
            console.log(res);
            this.groupEditForm.patchValue({
                groupName: res.groupName,
                numberOfSubgroup: res.numberOfSubgroup,
            });
        });
    }

    createFormGroup() {
        return new FormGroup({
            groupName: new FormControl('', Validators.required),
            numberOfSubgroup: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
        });
    }

    onSubmit() {
        const result: Group = Object.assign({}, this.groupEditForm.value);
        this.groupService.updateGroup(this.id, result)
            .subscribe(() => {console.log('Submitted!'); this.gotoGroupList(); });
    }

    gotoGroupList() {
        this.router.navigate(['/dictionaries/groups']);
    }
}
