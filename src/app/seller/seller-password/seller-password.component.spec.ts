import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPasswordComponent } from './seller-password.component';

describe('SellerPasswordComponent', () => {
  let component: SellerPasswordComponent;
  let fixture: ComponentFixture<SellerPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
