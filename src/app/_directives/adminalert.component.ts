import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../_services';

@Component({
    moduleId: module.id,
    selector: 'adminalert',
    templateUrl: 'adminalert.component.html'
})

export class AdminalertComponent implements OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { 
        // subscribe to alert messages
        this.subscription = alertService.getMessage().subscribe(message => { this.message = message; });
    }

    ngOnDestroy(): void {
        // unsubscribe on destroy to prevent memory leaks
        this.subscription.unsubscribe();
    }
}