import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanService, AlertService } from  '../../../_services';
import { Plan } from '../../../_models';

@Component({
  selector: 'app-add-plans',
  templateUrl: './add-plans.component.html',
  styleUrls: ['./add-plans.component.css']
})
export class AddPlansComponent implements OnInit {

  model: any = {};
  loading = false;
  plans: Plan[] = [];      
  constructor(
      private router: Router,
      private planService: PlanService,
      private alertService: AlertService
      ) { }

  ngOnInit() {
    this.loadAllPlans();
  }
  addPlan() {
    this.loading = true;
    
    this.planService.create(this.model)
        .subscribe(
            data => {
                this.alertService.success('Plan Added successfully', true);
                this.loadAllPlans();
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}

  loadAllPlans(){
    this.planService.getAll().subscribe(plans => { 
      this.plans = plans; 
    });
  }
}
