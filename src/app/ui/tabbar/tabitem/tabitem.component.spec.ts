import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabitemComponent } from './tabitem.component';

describe('TabitemComponent', () => {
  let component: TabitemComponent;
  let fixture: ComponentFixture<TabitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
