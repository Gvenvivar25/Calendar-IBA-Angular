import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss']
})
export class GroupAddComponent implements OnInit {

    groupForm: FormGroup;

    constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupService) {
    }

    ngOnInit() {
        this.groupForm = new FormGroup({
            groupName: new FormControl('', Validators.required),
            numberOfSubgroup: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
        });
    }

    onSubmit(form: NgForm) {
        console.log('Submitted!', form);
        this.groupService.saveGroup(form).subscribe(() => this.gotoGroupsList());
    }

    gotoGroupsList() {
        this.router.navigate(['/dictionaries/groups']);
    }

}
