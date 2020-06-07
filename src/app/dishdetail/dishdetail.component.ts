import { Component, OnInit, ViewChild, Inject} from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { MatSlider } from '@angular/material';
import { DatePipe } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  animations: [
    trigger('visibility', [
      state('shown', style({
        transform: 'scale(1.0)',
        opacity: 1
      })),
      state('hidden', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      transition('* => *', animate('0.5s ease-in-out'))
    ])
  ],

  providers: [DatePipe]
})
export class DishdetailComponent implements OnInit {
  @ViewChild('cform') commentFormDirective;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  flag: boolean = false;
  cflag: boolean = false;
  dflag: boolean = false;
  dishes: Dish[];
  errMess: string;
  dishcopy: Dish;
  commentForm: FormGroup;
  userComment:Comment = { author: '', comment: '', rating: 5, date: '' };
  userCommentNew: Comment = { author: '', comment: '', rating: 5, date: '' };
  visibility = 'shown';
  formErrors = {
    'author': '',
    'comment': ''
    
  };
  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.',

    },
  };
  constructor(private location: Location,
    private dishservice: DishService,
    private route: ActivatedRoute, private formbuilder: FormBuilder, private datePipe: DatePipe,
    @Inject('BaseURL') private BaseURL)
  {
    this.createForm();

  }

  ngOnInit() {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); }))
      .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown';},errmsg=>this.errMess=errmsg);

  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }
  createForm() {
    this.commentForm = this.formbuilder.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      comment: ['', Validators.required],
    });
    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data), errmess => this.errMess=errmess);

    this.onValueChanged(); // (re)set validation messages now

  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
        if (control && !control.dirty && control.valid) {
          this.dflag = true;
        }
      
      }
    }
  }

  onSubmit() {
    this.flag = true;
    this.userCommentNew = this.commentForm.value;
    this.userCommentNew.comment = this.userComment.comment;
    this.userCommentNew.author = this.userComment.author;
    this.userCommentNew.rating = this.userComment.rating;
    this.userCommentNew.date = new Date().toISOString();

    this.dishcopy.comments.push(this.userCommentNew);
    
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
        errmess => {
        this.dish = null; this.dishcopy = null;
          this.errMess = <any>errmess;
        });
    this.userComment = { author: '', comment: '', rating : 5, date: '' };
    this.commentForm.reset({
      Author: '',
      comment: ''
    });
    
    this.flag = true;
    this.cflag = false;
    this.commentFormDirective.resetForm();
  }

  setComments() {
    this.cflag = true;
    this.flag = false;
  }
}
