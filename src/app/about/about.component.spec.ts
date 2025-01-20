import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AboutComponent } from './about.component';
import { Location } from '@angular/common';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent],
      providers: [provideRouter([
        { path: '', component: AboutComponent },
      ])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it("should navigate to '/' when the Home button is clicked", 
  async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const homeButton = compiled.querySelector('button[routerLink="/"]') as HTMLElement;

    homeButton.click(); 
    await fixture.whenStable(); 

    expect(location.path()).toBe('');
  });

  it("should render the title 'How to Play"), () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('h1');
    expect(title?.textContent).toBe('How to Play');
  }

  it('should render all instructions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const instructions = compiled.querySelectorAll('.instructions ul li');
    const expectedInstructions = [
      'Answer questions of increasing difficulty, starting from 1st grade and progressing to 6th grade.',
      'Each correct answer earns you points and gets you closer to the final challenge..',
      'If you answer incorrectly, the game ends, and you\'ll have to start over.',
      'If you answer incorrectly, the game ends, and you\'ll have to start over.',
      'The final 6th-grade question is the ultimate challenge—can you ace it?'
    ];

    expect(instructions.length).toBe(expectedInstructions.length);
    instructions.forEach((li, index) => {
      expect(li.textContent?.trim()).toBe(expectedInstructions[index]);
    });
  });
  
  it('should have a Home button with correct text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const homeButton = compiled.querySelector('button.about-button');
    expect(homeButton).toBeTruthy();
    expect(homeButton?.textContent).toBe('Home');
  });
});