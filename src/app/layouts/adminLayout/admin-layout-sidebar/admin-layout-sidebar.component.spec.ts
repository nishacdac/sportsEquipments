import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLayoutSidebarComponent } from './admin-layout-sidebar.component';

describe('AdminLayoutSidebarComponent', () => {
  let component: AdminLayoutSidebarComponent;
  let fixture: ComponentFixture<AdminLayoutSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminLayoutSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLayoutSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
