import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepModel } from '../model/step-model';

const STEPS = [
  { stepIndex: 1, isComplete: false, name: 'category'},
  { stepIndex: 2, isComplete: false, name: 'subCategory' },
  { stepIndex: 3, isComplete: false, name: 'lesson' },
  { stepIndex: 4, isComplete: false, name: 'classroom' },
  { stepIndex: 5, isComplete: false, name: 'educator' },
  { stepIndex: 6, isComplete: false, name: 'lesson-classroom' },
  { stepIndex: 7, isComplete: false, name: 'educator-lesson' },
];

@Injectable({
  providedIn: 'root',
})
export class StepsService {
  steps$: BehaviorSubject<StepModel[]> = new BehaviorSubject<StepModel[]>(
    STEPS
  );
  currentStep$: BehaviorSubject<StepModel> = new BehaviorSubject<StepModel>(
    null
  );

  constructor() {
    this.currentStep$.next(this.steps$.value[0]);
  }

  setCurrentStep(step: StepModel) : void {
    this.currentStep$.next(step);
  }

  getCurrentStep() : Observable<StepModel> {
    return this.currentStep$.asObservable();
  }

  getSteps(): Observable<StepModel[]> {
    return this.steps$.asObservable();
  }

  moveToNextStep(): void {
    const index = this.currentStep$.value.stepIndex;
    if (index < this.steps$.value.length) {
      console.log(this.steps$.value[index].name);
      this.currentStep$.next(this.steps$.value[index]);
      console.log(this.currentStep$);
    }
  }

  isLastStep(): boolean {
    return this.currentStep$.value.stepIndex === this.steps$.value.length;
  }
}
