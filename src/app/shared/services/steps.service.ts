import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StepModel } from '../model/step-model';

const STEPS = [
  { stepIndex: 1, isComplete: true },
  { stepIndex: 2, isComplete: true },
  { stepIndex: 3, isComplete: true },
  { stepIndex: 4, isComplete: true },
  { stepIndex: 5, isComplete: true },
  { stepIndex: 6, isComplete: true },
  { stepIndex: 7, isComplete: false },
  { stepIndex: 8, isComplete: false },
  { stepIndex: 9, isComplete: false },
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

  setCurrentStep(step: StepModel): void {
    this.currentStep$.next(step);
  }

  getCurrentStep(): Observable<StepModel> {
    return this.currentStep$.asObservable();
  }

  getSteps(): Observable<StepModel[]> {
    return this.steps$.asObservable();
  }

  moveToNextStep(): void {
    const index = this.currentStep$.value.stepIndex;
    if (index < this.steps$.value.length) {
      this.currentStep$.next(this.steps$.value[index]);
    }
  }

  isLastStep(): boolean {
    return this.currentStep$.value.stepIndex === this.steps$.value.length;
  }
}
