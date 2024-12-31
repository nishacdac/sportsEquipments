import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterLayoutComponent } from './outerLayout.component';

describe('OuterLayoutComponent', () => {
  let component: OuterLayoutComponent;
  let fixture: ComponentFixture<OuterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OuterLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
