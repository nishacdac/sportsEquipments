import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutFooterComponent } from './admin-layout-footer.component';

describe('AdminLayoutFooterComponent', () => {
  let component: AdminLayoutFooterComponent;
  let fixture: ComponentFixture<AdminLayoutFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLayoutFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
