import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent], 
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when the button is clicked', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should render the correct content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('How to Play');
    expect(compiled.querySelector('ul')?.textContent).toContain('Answer questions of increasing difficulty');
  });
});