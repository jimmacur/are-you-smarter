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

    component.questionCount = 6;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getQuestion on init and fetch data', () => {
    expect(httpMock.get).toHaveBeenCalled();
    expect(component.currentQuestion.question).toBe(
      'What is the capital of France?'
    );
  });
});
