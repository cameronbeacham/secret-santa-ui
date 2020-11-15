import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesGeneratedComponent } from './matches-generated.component';

describe('MatchesGeneratedComponent', () => {
  let component: MatchesGeneratedComponent;
  let fixture: ComponentFixture<MatchesGeneratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchesGeneratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchesGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
