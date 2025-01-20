import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ResponseModalComponent } from './response-modal.component';
import { HomeComponent } from '../home/home.component';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ResponseModalComponent', () => {
  let component: ResponseModalComponent;
  let fixture: ComponentFixture<ResponseModalComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseModalComponent],
      providers: [provideRouter([
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
      ])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseModalComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct title', () => {
    component.title = 'Correct!!!';
    component.showModal = true;
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    expect(titleElement.textContent).toBe('Correct!!!');
  });

  it('should display the correct message', () => {
    component.message = 'You have won $500.';
    component.showModal = true;
    fixture.detectChanges();

    const messageElement = fixture.debugElement.query(By.css('.modal-message')).nativeElement;
    expect(messageElement.textContent).toContain('You have won $500.');
  });

  it('should display the correct statement when provided', () => {
    component.statement = 'This is a statement.';
    component.showModal = true;
    fixture.detectChanges();

    const statementElement = fixture.debugElement.query(By.css('.modal-statement')).nativeElement;
    expect(statementElement.textContent).toBe('This is a statement.');
  });

  it('should display the Next Question button when title is "Correct!!!"', () => {
    component.title = 'Correct!!!';
    component.showModal = true;
    fixture.detectChanges();

    const nextButton = fixture.debugElement.query(By.css('.next-button'));
    expect(nextButton).toBeTruthy();
    expect(nextButton.nativeElement.textContent).toBe(' Next Question ');
  });

  it('should not display the Next Question button when title is not "Correct!!!"', () => {
    component.title = 'Incorrect!!!';
    component.showModal = true;
    fixture.detectChanges();

    const nextButton = fixture.debugElement.query(By.css('.next-button'));
    expect(nextButton).toBeNull();
  });

  it('should display the Play Again button when title is "Incorrect!!!"', () => {
    component.title = 'Incorrect!!!';
    component.showModal = true;
    fixture.detectChanges();

    const playAgainButton = fixture.debugElement.query(By.css('.play-again-button'));
    expect(playAgainButton).toBeTruthy();
    expect(playAgainButton.nativeElement.textContent).toBe(' Play Again ');
  });

  it('should display the Home button', () => {
    component.showModal = true;
    fixture.detectChanges();

    const homeButton = fixture.debugElement.query(By.css('.home-button')).nativeElement;
    expect(homeButton.textContent).toBe('Home');
  });

  it("should navigate to '/home' when Home button is clicked", async () => {
    component.showModal = true;
    fixture.detectChanges();

    const homeButton = fixture.debugElement.query(By.css('.home-button')).nativeElement;
    homeButton.click();
    await fixture.whenStable();

    expect(location.path()).toBe('/home');
  });

  it('should emit the onNext event when Next Question button is clicked', () => {
    component.showModal = true;
    component.title = 'Correct!!!';
    fixture.detectChanges();

    spyOn(component.onNext, 'emit');

    const nextButton = fixture.debugElement.query(By.css('.next-button')).nativeElement;
    nextButton.click();

    expect(component.onNext.emit).toHaveBeenCalled();
  });

  it('should emit the onReset event when Play Again button is clicked', () => {
    component.showModal = true;
    component.title = 'Incorrect!!!';
    fixture.detectChanges();
    
    console.log("fixture2:",fixture.nativeElement.innerHTML);

    spyOn(component.onReset, 'emit');

    const resetButton = fixture.debugElement.query(By.css('.play-again-button'));
    expect(resetButton).toBeTruthy();
    resetButton.nativeElement.click();

    expect(component.onReset.emit).toHaveBeenCalled();
  });
});
