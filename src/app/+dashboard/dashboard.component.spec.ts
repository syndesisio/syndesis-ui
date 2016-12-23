import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { Dashboard } from './dashboard.component';
import { TemplateService } from './+templates/template.service';

describe('Dashboard', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      // provide a better mock
      {
        provide: ActivatedRoute,
        useValue: {
          data: {
            subscribe: (fn) => fn({
              yourData: 'yolo'
            })
          }
        }
      },
      Dashboard,
      TemplateService
    ]
  }));

  it('should log ngOnInit', inject([ Dashboard ], (dashboard) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    dashboard.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
