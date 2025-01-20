import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { HomeComponent } from './home.component';
import { Location } from '@angular/common';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([
        { path: 'game', component: HomeComponent },
        { path: 'about', component: HomeComponent }
      ])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to "game" when the Play button is clicked', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const playButton = compiled.querySelector('button[routerLink="/game"]') as HTMLElement;

    playButton.click();
    await fixture.whenStable();

    expect(location.path()).toBe('/game');
  });

  it('should navigate to "about" when the About button is clicked', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const aboutButton = compiled.querySelector('button[routerLink="/about"]') as HTMLElement;

    aboutButton.click();
    await fixture.whenStable();

    expect(location.path()).toBe('/about');
  });

  it('should have a title "Are You Smarter Than a 6th Grader?"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.title');
    expect(titleElement?.textContent).toContain('Are You Smarter Than a 6th Grader?');
  });

  it('should have a button to start the game', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const playButton = compiled.querySelector('button[routerLink="/game"]');
    expect(playButton).toBeTruthy();
  });

  it('should have a button to navigate to about page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const aboutButton = compiled.querySelector('button[routerLink="/about"]');
    expect(aboutButton).toBeTruthy();
  });
});
