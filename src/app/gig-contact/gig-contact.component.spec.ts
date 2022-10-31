import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigContactComponent } from './gig-contact.component';

describe('GigContactComponent', () => {
  let component: GigContactComponent;
  let fixture: ComponentFixture<GigContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GigContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GigContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
