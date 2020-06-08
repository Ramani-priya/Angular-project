import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';
import { visibility } from '../animations/app.animation';
import { flyInOut, expand } from '../animations/app.animation';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    flyInOut(),
    expand()
  ],
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leader: Leader;
  leaders: Leader[];
  constructor(private leaderservice:LeaderService,) { }

  ngOnInit() {
    this.leaderservice.getLeaders().subscribe(leaders => this.leaders = leaders); 
   // this.leader= this.leaderservice.getFeaturedLeader();
  }

}
