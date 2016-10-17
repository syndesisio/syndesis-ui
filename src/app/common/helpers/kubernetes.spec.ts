import { inject, TestBed } from '@angular/core/testing';
import * as URI from 'urijs';
import * as _ from 'lodash';

import { KubernetesAPI,
         CollectionTypes, 
         KindTypes, 
         Kinds,
         K8S_PREFIX,
         OS_PREFIX,
         K8S_EXT_PREFIX
       } from './kubernetes';

describe('KubernetesHelpers', () => {

  it('should gimme a name', () => {
    expect(KubernetesAPI.getName({
      metadata: {
        name: 'foo'
      }
    })).toEqual('foo');
  });

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
        kind: CollectionTypes.IMAGES,
        prefix: OS_PREFIX
      },
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
    var tests = [];
    Object.getOwnPropertyNames(CollectionTypes).forEach((name) => {
      switch (name) {
        case 'length':
        case 'name':
        case 'prototype':
          break;
        default:
          tests.push({
            kind: KindTypes[name],
            collection: CollectionTypes[name]
          });
      }
    });
    tests.forEach((test) => {
      expect(KubernetesAPI.toKindName(test.collection)).toEqual(test.kind);
      expect(KubernetesAPI.toCollectionName(test.kind)).toEqual(test.collection);
      expect(KubernetesAPI.toKindName(test.kind)).toEqual(test.kind);
      expect(KubernetesAPI.toCollectionName(test.collection)).toEqual(test.collection);
    });
  });

  it('should return the proper websocket URI', () => {
    var tests = [
      {
        source: 'http://localhost:8080/foo',
        target: 'ws://localhost:8080/foo'
      },
      {
        source: 'https://localhost:8080/foo',
        target: 'wss://localhost:8080/foo'
      },
    ];
    tests.forEach((test) => {
      expect(KubernetesAPI.wsUrl(test.source).toString()).toEqual(test.target);
    });
  });

  it('should return the right path', () => {
    var tests = [
      {
        kind: KindTypes.PODS,
        namespace: 'default',
        name: 'foo',
        expected: '/api/v1/namespaces/default/pods/foo'
      },
      {
        kind: KindTypes.SERVICES,
        namespace: 'default',
        expected: '/api/v1/namespaces/default/services'
      },
      {
        kind: KindTypes.REPLICA_SETS,
        namespace: 'default',
        expected: '/apis/extensions/v1beta1/namespaces/default/replicasets'
      },
      {
        kind: KindTypes.BUILD_CONFIGS,
        namespace: 'default',
        expected: '/oapi/v1/namespaces/default/buildconfigs'
      },
      {
        kind: KindTypes.NODES,
        expected: '/api/v1/nodes'
      }
    ];
    var uri = new URI('/');
    tests.forEach((test:any) => {
      expect(KubernetesAPI.url(uri, test.kind, test.namespace, test.name).toString()).toEqual(test.expected);
    });
  });

  it('should return the right path for objects', () => {
    var tests = [
      {
        obj: {
          kind: KindTypes.PODS,
          metadata: {
            name: 'foo',
            namespace: 'default'
          }
        },
        useNamespace: true,
        useName: true,
        expected: '/api/v1/namespaces/default/pods/foo'
      },
      {
        obj: {
          kind: KindTypes.SERVICES,
          metadata: {
            name: 'foo',
            namespace: 'default'
          }
        },
        useNamespace: true,
        useName: false,
        expected: '/api/v1/namespaces/default/services'
      },
      {
        obj: {
          kind: KindTypes.REPLICA_SETS,
          metadata: {
            name: 'foo',
            namespace: 'default'
          }
        },
        useNamespace: true,
        useName: true,
        expected: '/apis/extensions/v1beta1/namespaces/default/replicasets/foo'
      },
      {
        obj: {
          kind: KindTypes.IMAGES,
          metadata: {
            name: 'foo',
            namespace: 'default'
          }
        },
        useNamespace: true,
        useName: true,
        expected: '/oapi/v1/namespaces/default/images/foo'
      },
      {
        obj: {
          kind: KindTypes.PODS,
          metadata: {
            name: 'foo',
            namespace: 'default'
          }
        },
        useNamespace: false,
        useName: false,
        expected: '/api/v1/pods'
      }
    ];
    var uri = new URI('/');
    tests.forEach((test:any) => {
      var url = KubernetesAPI.urlForObject(uri, test.obj, test.useNamespace, test.useName);
      expect(url.toString()).toEqual(test.expected);
    });
  });

  it('should add query parameters other than name, kind or namespace', () => {
    var url = KubernetesAPI.applyQueryParameters(new URI(), {
      name: 'foo',
      namespace: 'bar',
      someParam: 'someVal'
    });
    var query = url.search(true);
    expect(query.name).toBe(undefined);
    expect(query.namespace).toBe(undefined);
    expect(query.someParam).toEqual('someVal');
  }

});

