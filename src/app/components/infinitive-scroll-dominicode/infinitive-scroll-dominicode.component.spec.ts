import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfinitiveScrollDominicodeComponent } from './infinitive-scroll-dominicode.component';

describe('InfinitiveScrollDominicodeComponent', () => {
  let component: InfinitiveScrollDominicodeComponent;
  let fixture: ComponentFixture<InfinitiveScrollDominicodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfinitiveScrollDominicodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfinitiveScrollDominicodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
