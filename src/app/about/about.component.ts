import { Component, OnInit } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { LeaderService } from '../services/leader.service';
import { MatLine } from '@angular/material';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leader: Leader;
  leaders: Leader[];
  constructor(private leaderservice:LeaderService,) { }

  ngOnInit() {
    this.leaderservice.getLeaders().then(leaders => this.leaders = leaders); 
   // this.leader= this.leaderservice.getFeaturedLeader();
  }

}
