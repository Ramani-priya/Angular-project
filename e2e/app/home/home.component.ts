import { Component, OnInit, Inject } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Dish } from '../shared/dish';
import { PromotionService } from '../services/promotion.service';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { visibility } from '../animations/app.animation';
import { flyInOut, expand} from '../animations/app.animation';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMsg: string;
  constructor(private leaderservice: LeaderService,
    private dishservice: DishService, private promotionservice: PromotionService,
  @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish,errmsg=>this.dishErrMsg=errmsg);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion, errmsg => this.dishErrMsg = errmsg);
    this.leaderservice.getFeaturedLeader().subscribe(leader => this.leader = leader, errmess => this.dishErrMsg = errmess);
  }

}
