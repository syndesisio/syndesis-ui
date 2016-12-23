import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {inject, TestBed} from '@angular/core/testing';

// Load the implementations that should be tested
import {Templates} from './template.component';

describe('Templates', () => {
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
            Templates
        ]
    }));
    
    it('should log ngOnInit', inject([Templates], (templates) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        templates.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
    
});
