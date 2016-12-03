/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuiztestFinalComponent } from './quiztest-final.component';

describe('QuiztestFinalComponent', () => {
  let component: QuiztestFinalComponent;
  let fixture: ComponentFixture<QuiztestFinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiztestFinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiztestFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
