import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AlertService } from  '../../../_services';


@Component({
  selector: 'app-updatedocument',
  templateUrl: './updatedocument.component.html',
  styleUrls: ['./updatedocument.component.css']
})
export class UpdatedocumentComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  updateDocs(){
    this.loading = true;
    this.userService.update(this.model)
        .subscribe(
            data => {
              this.alertService.success("Saved Successfully! Please send scanned copies of PAN Card and address proof to mytradnix@gmail.com for verification.");
                this.loading = false;
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
  }

}
