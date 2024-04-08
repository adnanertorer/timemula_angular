import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StepModel } from 'src/app/shared/model/step-model';
import { StepsService } from 'src/app/shared/services/steps.service';

@Component({
  selector: 'app-register-form-page',
  templateUrl: './register-form-page.component.html',
  styleUrls: ['./register-form-page.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class RegisterFormPageComponent implements OnInit {

  currentStep: Observable<StepModel>;

  constructor(private stepsService: StepsService, private router: Router) { }

  ngOnInit() {
    this.currentStep = this.stepsService.getCurrentStep();
  }

  onNextStep() {
    if (!this.stepsService.isLastStep()) {
      this.stepsService.moveToNextStep();
    } else {
      this.onSubmit();
    }
  }

  showButtonLabel() {
    return !this.stepsService.isLastStep() ? 'Continue' : 'Finish';
  }

  onSubmit(): void {
    this.router.navigate(['complete']);
  }
}
