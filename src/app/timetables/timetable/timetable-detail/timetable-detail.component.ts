import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NewEvent} from '../../../shared/models/timetable-of-classes.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GroupService} from '../../../dictionaries/groups/group.service';
import {Group} from '../../../dictionaries/groups/group.model';
import {DisciplinesService} from '../../../dictionaries/disciplines/disciplines.service';
import {TeachersService} from '../../../dictionaries/teachers/teachers.service';
import {Discipline} from '../../../dictionaries/disciplines/discipline.model';
import {Teacher} from '../../../dictionaries/teachers/teacher.model';
import {DescriptionOfPlanService} from '../../../shared/services/description-of-plan.service';
import {TypeOfWork} from '../../../dictionaries/courses/course.model';
import {ClassroomService} from '../../../dictionaries/classrooms/classroom.service';
import {Classroom} from '../../../dictionaries/classrooms/classroom.model';
import {TimetableOfClassesService} from '../../../shared/services/timetable-of-classes.service';

@Component({
  selector: 'app-timetable-detail',
  templateUrl: './timetable-detail.component.html',
  styleUrls: ['./timetable-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableDetailComponent implements OnInit, OnChanges {
    @Input() event: NewEvent;
    @Input() isNew: boolean;
    @Output() closed = new EventEmitter();
    @Output() add = new EventEmitter<NewEvent>();
    @Output() update = new EventEmitter<NewEvent>();
    @Output() delete = new EventEmitter<NewEvent>();
    detailBookingForm: FormGroup;

    groups: Group[];
    disciplines: Discipline[];
    teachers: Teacher[];
    typesOfWork: TypeOfWork[];
    classrooms: Classroom[];


  constructor(private formBuilder: FormBuilder, private groupService: GroupService, private disciplinesService: DisciplinesService,
              private teachersService: TeachersService, private descriptionOfPlanService: DescriptionOfPlanService,
              private classroomsService: ClassroomService, private timetableOfClassesService: TimetableOfClassesService) {
      this.detailBookingForm = this.formBuilder.group({
          id: [null],
          day: [null, Validators.required],
          startTime: ['', Validators.required],
          endTime: ['', Validators.required],
          group: [[], Validators.required],
          subgroup: ['', Validators.required],
          discipline: [[], Validators.required],
          teacher: [[], Validators.required],
          typeOfWork: [[], Validators.required],
          classroom: [[], Validators.required],
          status: [false],
          reserved: [true]
      });
  }


    ngOnChanges(simpleChanges: SimpleChanges): void {
      console.log(simpleChanges);

      if (simpleChanges.event && simpleChanges.event.currentValue) {
          this.detailBookingForm.patchValue({ ...this.event });
      }

    }

    onAdd(): void {
      const newEvent: NewEvent = this.detailBookingForm.value;
      console.log(newEvent);
      this.add.emit(newEvent);
    }

    onUpdate(): void {
        const updateEvent: NewEvent = this.detailBookingForm.value;
        this.update.emit(updateEvent);
    }

    onDelete(): void {
        const deleteEvent: NewEvent = this.detailBookingForm.value;
        this.delete.emit(deleteEvent);
    }

    ngOnInit(): void {
      this.groupService.getGroups().subscribe((res: Group[]) => {
          this.groups = res;
        });
      this.disciplinesService.getDisciplines().subscribe((res: Discipline[]) => {
          this.disciplines = res;
      });
      this.teachersService.getTeachers().subscribe((res: Teacher[]) => {
          this.teachers = res;
      });
      this.descriptionOfPlanService.getTypesOfWork().subscribe((res: TypeOfWork[]) => {
          this.typesOfWork = res;
        });
      this.classroomsService.getClassrooms().subscribe((res: Classroom[]) => {
          this.classrooms = res;
        });
      this.timetableOfClassesService.getAllFreeClassrooms(this.detailBookingForm.get('day').value,
          this.detailBookingForm.get('startTime').value, this.detailBookingForm.get('endTime').value).
          subscribe((res: Classroom[]) => {
            this.classrooms = res;
            console.log(this.classrooms);
        });
    }

}
