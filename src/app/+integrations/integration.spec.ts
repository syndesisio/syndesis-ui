import { ActivatedRoute } from '@angular/router';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { Integrations } from './integrations.component';

describe('Integrations', () => {
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
      Integrations
    ]
  }));

  it('should log ngOnInit', inject([ Integrations ], (integrations) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    integrations.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));

});
