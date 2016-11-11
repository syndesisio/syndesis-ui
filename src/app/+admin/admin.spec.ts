import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { Admin } from './admin.component';

describe('Admin', () => {
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
            Admin
        ]
    }));

    it('should log ngOnInit', inject([ Admin ], (admin) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();

        admin.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));

});
