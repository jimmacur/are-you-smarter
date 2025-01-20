import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { QuestionComponent } from './question.component';
import { of } from 'rxjs';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let httpMock: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpMock = jasmine.createSpyObj('HttpClient', ['get']);
    httpMock.get.and.returnValue(
      of({
        results: [
          {
            question: 'What is the capital of France?',
            correct_answer: 'Paris',
            incorrect_answers: ['London', 'Berlin', 'Madrid'],
          },
        ],
      })
    );
    
    await TestBed.configureTestingModule({
      imports: [QuestionComponent],
      providers: [
        { provide: HttpClient, useValue: httpMock },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getQuestion on init', () => {
    spyOn(component, 'getQuestion');
    component.ngOnInit();
    expect(component.getQuestion).toHaveBeenCalled();
  });

  it('should set grade-specific questions correctly', () => {
    component.questionCount = 1;
    component.getQuestion();
    expect(component.headerText).toBe('Are you smarter than a 1st grader?');
    expect(component.currentQuestion).toBeDefined();
    expect(component.currentQuestion.question).toBeDefined();
  });

  it('should shuffle answers correctly', () => {
    const answers = ['Paris', 'London', 'Berlin', 'Madrid'];
    const shuffledAnswers = component.shuffle([...answers]);
    expect(shuffledAnswers).not.toEqual(answers);
    expect(shuffledAnswers.sort()).toEqual(answers.sort());
  });

  it('should handle correct answer', () => {
    component.currentQuestion = { correctAnswer: 'Paris', statement: 'Capital of France' };
    component.selectedAnswer = 'Paris';
    component.checkAnswer();
    expect(component.modalTitle).toBe('Correct!!!');
    expect(component.modalMessage).toBe('Capital of France');
    expect(component.showModal).toBeTrue();
    expect(component.questionCount).toBe(2);
  });

  it('should handle incorrect answer', () => {
    component.currentQuestion = { correctAnswer: 'Paris', statement: 'Capital of France' };
    component.selectedAnswer = 'Berlin';
    component.checkAnswer();
    expect(component.modalTitle).toBe('Incorrect!!!');
    expect(component.modalMessage).toContain('The correct answer was: Paris.');
    expect(component.showModal).toBeTrue();
  });

  it('should reset the game correctly', () => {
    component.resetGame();
    expect(component.questionCount).toBe(1);
    expect(component.isGameComplete).toBeFalse();
    expect(component.showModal).toBeFalse();
  });

  it('should handle next question correctly', () => {
    spyOn(component, 'getQuestion');
    component.nextQuestion();
    expect(component.showModal).toBeFalse();
    expect(component.getQuestion).toHaveBeenCalled();
  });

  it('should update headerText for final question', () => {
    component.questionCount = 6;
    component.getQuestion();
    expect(component.headerText).toBe('Are you smarter than a 6th grader?');
  });

  it('should fetch data for the final question', () => {
    component.questionCount = 6;
    component.getQuestion();
    expect(httpMock.get).toHaveBeenCalledWith(component.apiUrl);
    expect(component.currentQuestion.question).toBe('What is the capital of France?');
    expect(component.currentQuestion.correctAnswer).toBe('Paris');
    expect(component.currentQuestion.incorrectAnswers).toEqual(['London', 'Berlin', 'Madrid']);
  });
});
