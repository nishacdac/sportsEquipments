import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutHeaderComponent } from './admin-layout-header.component';

describe('AdminLayoutHeaderComponent', () => {
  let component: AdminLayoutHeaderComponent;
  let fixture: ComponentFixture<AdminLayoutHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLayoutHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
