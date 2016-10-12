import { inject, TestBed } from '@angular/core/testing';
import * as URI from 'urijs';
import * as _ from 'lodash';

import { KubernetesAPI,
         CollectionTypes, 
         KindTypes, 
         NamespacedTypes,
         K8S_PREFIX,
         OS_PREFIX,
         K8S_EXT_PREFIX
       } from './kubernetes.helpers';

describe('KubernetesHelpers', () => {

  it('should return true for namespaced types and false for not namespaced types', () => {
    var tests = [
      {
        kind: CollectionTypes.PODS,
        namespaced: true
      },
      {
        kind: CollectionTypes.POLICIES,
        namespaced: false
      },
      {
        kind: KindTypes.NAMESPACES,
        namespaced: false
      },
      {
        kind: CollectionTypes.PERSISTENT_VOLUMES,
        namespaced: false
      },
      {
        kind: KindTypes.PERSISTENT_VOLUME_CLAIMS,
        namespaced: true
      },
      {
        kind: CollectionTypes.SERVICES,
        namespaced: true
      },
      {
        kind: CollectionTypes.SERVICE_ACCOUNTS,
        namespaced: true
      }
    ];
    tests.forEach((test) => {
      expect(KubernetesAPI.namespaced(test.kind)).toEqual(test.namespaced);
    });
  });

  it('should return the correct API prefix', () => {
    var tests = [
      {
        kind: CollectionTypes.PODS,
        prefix: K8S_PREFIX
      },
      {
        kind: CollectionTypes.DEPLOYMENTS,
        prefix: K8S_EXT_PREFIX
      },
      {
        kind: KindTypes.ROUTES,
        prefix: OS_PREFIX
      }
    ];
    tests.forEach((test) => {
        expect(KubernetesAPI.apiForKind(test.kind)).toEqual(test.prefix);
    });
  });


  it('should be possible to go from a kind to a collection name', () => {

  });

});

