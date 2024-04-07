import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { StepModel } from 'src/app/shared/model/step-model';
import { StepsService } from 'src/app/shared/services/steps.service';

@Component({
  selector: 'app-register-wizard-steps',
  templateUrl: './register-wizard-steps.component.html',
  styleUrls: ['./register-wizard-steps.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterWizardStepsComponent implements OnInit {

  steps: Observable<StepModel[]>;
  currentStep: Observable<StepModel>;

  constructor(private stepsService: StepsService) { }

  ngOnInit() {
    this.steps = this.stepsService.getSteps();
    this.currentStep = this.stepsService.getCurrentStep();
  }

  onStepClick(step: StepModel) {
    this.stepsService.setCurrentStep(step);
  }

}
