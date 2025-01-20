import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalWinningsComponent } from './total-winnings.component';

describe('TotalWinningsComponent', () => {
  let component: TotalWinningsComponent;
  let fixture: ComponentFixture<TotalWinningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalWinningsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalWinningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the initial total winnings as $0', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const winningsElement = compiled.querySelector('.total-winnings');
    expect(winningsElement?.textContent).toContain('$0');
  });
});
