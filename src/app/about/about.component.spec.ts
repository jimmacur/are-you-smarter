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
});