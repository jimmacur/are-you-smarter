import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ResponseModalComponent } from './response-modal.component';
import { Location } from '@angular/common';

describe('ResponseModalComponent', () => {
  let component: ResponseModalComponent;
  let fixture: ComponentFixture<ResponseModalComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResponseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
