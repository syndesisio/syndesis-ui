import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {inject, TestBed} from '@angular/core/testing';

// Load the implementations that should be tested
import {Connections} from './connections.component';

describe('Connections', () => {
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
            Connections
        ]
    }));
    
    it('should log ngOnInit', inject([Connections], (connections) => {
        spyOn(console, 'log');
        expect(console.log).not.toHaveBeenCalled();
        
        connections.ngOnInit();
        expect(console.log).toHaveBeenCalled();
    }));
    
});
