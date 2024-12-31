import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerLayoutComponent } from './sellerLayout.component';

describe('SellerLayoutComponent', () => {
  let component: SellerLayoutComponent;
  let fixture: ComponentFixture<SellerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
