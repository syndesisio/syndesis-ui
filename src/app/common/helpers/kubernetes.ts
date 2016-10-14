
import * as URI from 'urijs';
import * as _ from 'lodash';

import { Logger } from './../service/log';

var log = Logger.get('KubernetesAPI');

export var K8S_PREFIX = 'api';
export var OS_PREFIX = 'oapi';
export var K8S_EXT_PREFIX = 'apis';

export var K8S_API_VERSION = 'v1';
export var OS_API_VERSION = 'v1';
export var K8S_EXT_VERSION = 'v1beta1';
export var K8S_EXTENSIONS = 'extensions';

export class KindTypes {
  public static get LIST(): string { return "List"; }
  public static get ENDPOINTS(): string { return "Endpoint"; }
  public static get EVENTS(): string { return "Event"; }
  public static get NAMESPACES(): string { return "Namespace"; }
  public static get NODES(): string { return "Node"; }
  public static get PERSISTENT_VOLUMES(): string { return "PersistentVolume"; }
  public static get PERSISTENT_VOLUME_CLAIMS(): string { return "PersistentVolumeClaim"; }
  public static get PODS(): string { return "Pod"; }
  public static get REPLICATION_CONTROLLERS(): string { return "ReplicationController"; }
  public static get REPLICA_SETS(): string { return "ReplicaSet"; }
  public static get RESOURCE_QUOTAS(): string { return "ResourceQuota"; }
  public static get OAUTH_CLIENTS(): string { return "OAuthClient"; }
  public static get SECRETS(): string { return "Secret"; }
  public static get SERVICES(): string { return "Service"; }
  public static get SERVICE_ACCOUNTS(): string { return "ServiceAccount"; }
  public static get CONFIG_MAPS(): string { return "ConfigMap"; }
  public static get INGRESSES(): string { return "Ingress"; }

  public static get TEMPLATES(): string { return "Template"; }
  public static get ROUTES(): string { return "Route"; }
  public static get BUILD_CONFIGS(): string { return "BuildConfig"; }
  public static get BUILDS(): string { return "Build"; }
  public static get DEPLOYMENT_CONFIGS(): string { return "DeploymentConfig"; }
  public static get DEPLOYMENTS(): string { return "Deployment"; }
  public static get IMAGES(): string { return "Image"; }
  public static get IMAGE_STREAMS(): string { return "ImageStream"; }
  public static get IMAGE_STREAM_TAGS(): string { return "ImageStreamTag"; }
  public static get POLICIES(): string { return "Policy"; }
  public static get POLICY_BINDINGS(): string { return "PolicyBinding"; }
  public static get PROJECTS(): string { return "Project"; }
  public static get ROLE_BINDINGS(): string { return "RoleBinding"; }
  public static get ROLES(): string { return "Role"; }
  public static get DAEMONSETS(): string { return "DaemonSet"; }
}

export class CollectionTypes {
  public static get LIST(): string { return "list"; }
  public static get ENDPOINTS(): string { return "endpoints"; }
  public static get EVENTS(): string { return "events"; }
  public static get NAMESPACES(): string { return "namespaces"; }
  public static get NODES(): string { return "nodes"; }
  public static get PERSISTENT_VOLUMES(): string { return "persistentvolumes"; }
  public static get PERSISTENT_VOLUME_CLAIMS(): string { return "persistentvolumeclaims"; }
  public static get PODS(): string { return "pods"; }
  public static get REPLICATION_CONTROLLERS(): string { return "replicationcontrollers"; }
  public static get REPLICA_SETS(): string { return "replicasets"; }
  public static get RESOURCE_QUOTAS(): string { return "resourcequotas"; }
  public static get OAUTH_CLIENTS(): string { return "oauthclients"; }
  public static get SECRETS(): string { return "secrets"; }
  public static get SERVICES(): string { return "services"; }
  public static get SERVICE_ACCOUNTS(): string { return "serviceaccounts"; }
  public static get CONFIG_MAPS(): string { return "configmaps"; }
  public static get INGRESSES(): string { return "ingresses"; }

  public static get TEMPLATES(): string { return "templates"; }
  public static get ROUTES(): string { return "routes"; }
  public static get BUILD_CONFIGS(): string { return "buildconfigs"; }
  public static get BUILDS(): string { return "builds"; }
  public static get DEPLOYMENT_CONFIGS(): string { return "deploymentconfigs"; }
  public static get DEPLOYMENTS(): string { return "deployments"; }
  public static get IMAGES(): string { return "images"; }
  public static get IMAGE_STREAMS(): string { return "imagestreams"; }
  public static get IMAGE_STREAM_TAGS(): string { return "imagestreamtags"; }
  public static get POLICIES(): string { return "policies"; }
  public static get POLICY_BINDINGS(): string { return "policybindings"; }
  public static get PROJECTS(): string { return "projects"; }
  public static get ROLE_BINDINGS(): string { return "rolebindings"; }
  public static get ROLES(): string { return "roles"; }
  public static get DAEMONSETS(): string { return "daemonsets"; }
}

export class ExtensionTypes {
  public static get extensions(): Array<string> {
    return [
      CollectionTypes.DAEMONSETS,
      CollectionTypes.REPLICA_SETS,
      CollectionTypes.DEPLOYMENTS
    ];
  }
}

export class Kinds {
  // Vanilla Kubernetes types
  public static get k8s(): Array<string> {
    return [
      CollectionTypes.CONFIG_MAPS,
      CollectionTypes.ENDPOINTS,
      CollectionTypes.EVENTS,
      CollectionTypes.INGRESSES,
      CollectionTypes.NODES,
      CollectionTypes.PERSISTENT_VOLUMES,
      CollectionTypes.PERSISTENT_VOLUME_CLAIMS,
      CollectionTypes.PODS,
      CollectionTypes.REPLICATION_CONTROLLERS,
      CollectionTypes.RESOURCE_QUOTAS,
      CollectionTypes.PERSISTENT_VOLUMES,
      CollectionTypes.SECRETS,
      CollectionTypes.SERVICES,
      CollectionTypes.SERVICE_ACCOUNTS,
      CollectionTypes.REPLICA_SETS,
      CollectionTypes.DEPLOYMENTS
    ];
  }
  // Openshift specific types
  public static get os(): Array<string> {
    return [
      CollectionTypes.TEMPLATES,
      CollectionTypes.BUILD_CONFIGS,
      CollectionTypes.ROUTES,
      CollectionTypes.BUILDS,
      CollectionTypes.BUILD_CONFIGS,
      CollectionTypes.DEPLOYMENT_CONFIGS,
      CollectionTypes.IMAGES,
      CollectionTypes.IMAGE_STREAMS,
      CollectionTypes.IMAGE_STREAM_TAGS,
      CollectionTypes.OAUTH_CLIENTS,
      CollectionTypes.POLICIES,
      CollectionTypes.POLICY_BINDINGS,
      CollectionTypes.PROJECTS,
      CollectionTypes.ROLE_BINDINGS,
      CollectionTypes.ROLES
    ];
  }
}

export module KubernetesAPI {

  export function apiPrefix() {
    return K8S_PREFIX;
  }

  export function osApiPrefix() {
    return OS_PREFIX;
  }

  export function extPrefix() {
    return K8S_EXT_PREFIX;
  }

  export function namespaced(kind:string) {
    switch (toCollectionName(kind)) {
      case CollectionTypes.POLICIES:
      case CollectionTypes.OAUTH_CLIENTS:
      case CollectionTypes.NAMESPACES:
      case CollectionTypes.NODES:
      case CollectionTypes.PERSISTENT_VOLUMES:
      case CollectionTypes.PROJECTS:
        return false;

      default:
        return true;
    }
  }

  /*
   * Returns the appropriate API prefix for the supplied kind
   */
  export function apiForKind(kind:string) {
    kind = toCollectionName(kind);
    if (kind === CollectionTypes.NAMESPACES) {
      return K8S_PREFIX;
    }
    if (_.some(ExtensionTypes.extensions, (t) => t === kind)) {
      return K8S_EXT_PREFIX;
    }
    if (_.some(Kinds.k8s, (t) => t === kind)) {
      return K8S_PREFIX;
    }
    if (_.some(Kinds.os, (t) => t === kind)) {
      return OS_PREFIX;
    }
    return null;
  }

  /*
   * Returns the single 'kind' of an object from the collection kind
   */
  export function toKindName(kind:any):string {
    if (_.isObject(kind)) {
      return getKind(kind);
    }
    switch (kind) {
      case CollectionTypes.LIST: return KindTypes.LIST;
      case CollectionTypes.ENDPOINTS:  return KindTypes.ENDPOINTS; 
      case CollectionTypes.EVENTS:  return KindTypes.EVENTS; 
      case CollectionTypes.NAMESPACES:  return KindTypes.NAMESPACES; 
      case CollectionTypes.NODES:  return KindTypes.NODES; 
      case CollectionTypes.PERSISTENT_VOLUMES:  return KindTypes.PERSISTENT_VOLUMES; 
      case CollectionTypes.PERSISTENT_VOLUME_CLAIMS:  return KindTypes.PERSISTENT_VOLUME_CLAIMS; 
      case CollectionTypes.PODS:  return KindTypes.PODS; 
      case CollectionTypes.REPLICATION_CONTROLLERS:  return KindTypes.REPLICATION_CONTROLLERS; 
      case CollectionTypes.REPLICA_SETS:  return KindTypes.REPLICA_SETS; 
      case CollectionTypes.RESOURCE_QUOTAS:  return KindTypes.RESOURCE_QUOTAS; 
      case CollectionTypes.OAUTH_CLIENTS:  return KindTypes.OAUTH_CLIENTS; 
      case CollectionTypes.SECRETS:  return KindTypes.SECRETS; 
      case CollectionTypes.SERVICES:  return KindTypes.SERVICES; 
      case CollectionTypes.SERVICE_ACCOUNTS:  return KindTypes.SERVICE_ACCOUNTS; 
      case CollectionTypes.CONFIG_MAPS:  return KindTypes.CONFIG_MAPS; 
      case CollectionTypes.INGRESSES:  return KindTypes.INGRESSES; 
      case CollectionTypes.TEMPLATES:  return KindTypes.TEMPLATES; 
      case CollectionTypes.ROUTES:  return KindTypes.ROUTES; 
      case CollectionTypes.BUILD_CONFIGS:  return KindTypes.BUILD_CONFIGS; 
      case CollectionTypes.BUILDS:  return KindTypes.BUILDS; 
      case CollectionTypes.DEPLOYMENT_CONFIGS:  return KindTypes.DEPLOYMENT_CONFIGS; 
      case CollectionTypes.DEPLOYMENTS:  return KindTypes.DEPLOYMENTS; 
      case CollectionTypes.IMAGES:  return KindTypes.IMAGES; 
      case CollectionTypes.IMAGE_STREAMS:  return KindTypes.IMAGE_STREAMS; 
      case CollectionTypes.IMAGE_STREAM_TAGS:  return KindTypes.IMAGE_STREAM_TAGS; 
      case CollectionTypes.POLICIES:  return KindTypes.POLICIES; 
      case CollectionTypes.POLICY_BINDINGS:  return KindTypes.POLICY_BINDINGS; 
      case CollectionTypes.PROJECTS:  return KindTypes.PROJECTS; 
      case CollectionTypes.ROLE_BINDINGS:  return KindTypes.ROLE_BINDINGS; 
      case CollectionTypes.ROLES:  return KindTypes.ROLES; 
      case CollectionTypes.DAEMONSETS:  return KindTypes.DAEMONSETS; 
      default: return kind;
    }
  }

  /*
   * Returns the collection kind of an object from the singular kind
   */
  export function toCollectionName(kind:any):string {
    if (_.isObject(kind)) {
      kind = getKind(kind);
    }
    switch (kind) {
      case KindTypes.LIST: return CollectionTypes.LIST;
      case KindTypes.ENDPOINTS:  return CollectionTypes.ENDPOINTS; 
      case KindTypes.EVENTS:  return CollectionTypes.EVENTS; 
      case KindTypes.NAMESPACES:  return CollectionTypes.NAMESPACES; 
      case KindTypes.NODES:  return CollectionTypes.NODES; 
      case KindTypes.PERSISTENT_VOLUMES:  return CollectionTypes.PERSISTENT_VOLUMES; 
      case KindTypes.PERSISTENT_VOLUME_CLAIMS:  return CollectionTypes.PERSISTENT_VOLUME_CLAIMS; 
      case KindTypes.PODS:  return CollectionTypes.PODS; 
      case KindTypes.REPLICATION_CONTROLLERS:  return CollectionTypes.REPLICATION_CONTROLLERS; 
      case KindTypes.REPLICA_SETS:  return CollectionTypes.REPLICA_SETS; 
      case KindTypes.RESOURCE_QUOTAS:  return CollectionTypes.RESOURCE_QUOTAS; 
      case KindTypes.OAUTH_CLIENTS:  return CollectionTypes.OAUTH_CLIENTS; 
      case KindTypes.SECRETS:  return CollectionTypes.SECRETS; 
      case KindTypes.SERVICES:  return CollectionTypes.SERVICES; 
      case KindTypes.SERVICE_ACCOUNTS:  return CollectionTypes.SERVICE_ACCOUNTS; 
      case KindTypes.CONFIG_MAPS:  return CollectionTypes.CONFIG_MAPS; 
      case KindTypes.INGRESSES:  return CollectionTypes.INGRESSES; 
      case KindTypes.TEMPLATES:  return CollectionTypes.TEMPLATES; 
      case KindTypes.ROUTES:  return CollectionTypes.ROUTES; 
      case KindTypes.BUILD_CONFIGS:  return CollectionTypes.BUILD_CONFIGS; 
      case KindTypes.BUILDS:  return CollectionTypes.BUILDS; 
      case KindTypes.DEPLOYMENT_CONFIGS:  return CollectionTypes.DEPLOYMENT_CONFIGS; 
      case KindTypes.DEPLOYMENTS:  return CollectionTypes.DEPLOYMENTS; 
      case KindTypes.IMAGES:  return CollectionTypes.IMAGES; 
      case KindTypes.IMAGE_STREAMS:  return CollectionTypes.IMAGE_STREAMS; 
      case KindTypes.IMAGE_STREAM_TAGS:  return CollectionTypes.IMAGE_STREAM_TAGS; 
      case KindTypes.POLICIES:  return CollectionTypes.POLICIES; 
      case KindTypes.POLICY_BINDINGS:  return CollectionTypes.POLICY_BINDINGS; 
      case KindTypes.PROJECTS:  return CollectionTypes.PROJECTS; 
      case KindTypes.ROLE_BINDINGS:  return CollectionTypes.ROLE_BINDINGS; 
      case KindTypes.ROLES:  return CollectionTypes.ROLES; 
      case KindTypes.DAEMONSETS:  return CollectionTypes.DAEMONSETS; 
      default: return kind;
    }
  }
  
  /*
   * Returns either secure/insecure websocket protocol based on the master URI protocol
   */
  export function wsScheme(url:string) {
    var protocol = new URI(url).protocol() || 'http';
    switch(protocol) {
      case 'https':
        return 'wss';
      default:
        return 'ws';
    }
  }

  /*
   * Returns the websocket URL for the supplied URL
   */
  export function wsUrl(url:string) {
    var protocol = wsScheme(url);
    return new URI(url).scheme(protocol);
  }

  /*
   * Compare two k8s objects based on their UID
   */
  export function equals(left, right):boolean {
    var leftUID = getUID(left);
    var rightUID = getUID(right);
    // fallback to a full object comparison
    if (!leftUID && !rightUID) {
      return JSON.stringify(left) === JSON.stringify(right);
    }
    return leftUID === rightUID;
  }

  export function kubernetesApiPrefix():string {
    return URI.joinPaths(apiPrefix(), K8S_API_VERSION).toString();
  }

  export function kubernetesApiExtensionPrefix():string {
    return URI.joinPaths(K8S_EXT_PREFIX, K8S_EXTENSIONS, K8S_EXT_VERSION).toString(); 
  }

  export function openshiftApiPrefix():string {
    return URI.joinPaths(osApiPrefix(), OS_API_VERSION).toString();
  }

  export function apiVersionForKind(kind:string):string {
    var api = apiForKind(kind);
    switch(api) {
      case K8S_EXT_PREFIX:
        return kubernetesApiExtensionPrefix();
      case K8S_API_VERSION:
        return kubernetesApiPrefix();
      case OS_API_VERSION:
        return openshiftApiPrefix();
      default:
        return null;
    }
  }

  export function prefixForKind(kind:string) {
    var api = apiForKind(kind);
    switch(api) {
      case K8S_EXT_PREFIX:
        return kubernetesApiExtensionPrefix();
      case K8S_PREFIX:
        return kubernetesApiPrefix();
      case OS_PREFIX:
        return openshiftApiPrefix();
      default:
        return null;
    }
  }

  var pathOverrides:any = {};

  /*
   * Set a path generation override for a given type
   */
  export function setPathOverride(kind:string, fn:(apiServerUri:uri.URI, kind:string, namespace?:string, name?:string) => uri.URI):void {
    pathOverrides[toCollectionName(kind)] = fn;
  }

  /*
   * Fetch a previously set path override for a type, returns undefined if an override isn't set
   */
  export function getPathOverride(kind:string):(apiServerUri:uri.URI, kind:string, namespace?:string, name?:string) => uri.URI {
    return <(apiServerUri:uri.URI, kind:string, namespace?:string, name?:string) => uri.URI> _.get(pathOverrides, toCollectionName(kind));
  }

  /*
   * Generate a full URL incorporating the supplied options
   */
  export function url(apiServerUri:uri.URI, kind:string, namespace?:string, name?:string):uri.URI {
    // avoid mutating the passed in URI object
    apiServerUri = apiServerUri.clone();
    kind = toCollectionName(kind);
    var pathOverride = getPathOverride(kind);
    if (pathOverride) {
      return pathOverride(apiServerUri, kind, namespace, name);
    }
    apiServerUri.segment(prefixForKind(kind));
    if (namespace) {
      apiServerUri.segment('namespaces').segment(namespace);
    }
    apiServerUri.segment(kind);
    if (name) {
      apiServerUri.segment(name);
    }
    return apiServerUri;
  }

  /*
   * Generate a URL using the passed in kuberentes object
   */
  export function urlForObject(apiServerUri:uri.URI, obj:any, useNamespace:boolean = true, useName:boolean = true):uri.URI {
    var kind = getKind(obj);
    var namespace:string = useNamespace ? getNamespace(obj) : undefined;
    var name:string = useName ? getName(obj) : undefined;
    return url(apiServerUri, kind, namespace, name);
  }

  /*
   * Apply the supplied options object as query parameters to the passed in URL
   */
  export function applyQueryParameters(uri:uri.URI, options:any) {
    var opts = _.cloneDeep(options);
    delete opts.kind;
    delete opts.namespace;
    delete opts.name;
    if (_.keys(opts).length > 0) {
      return uri.search(opts);
    }
    else return uri;
  }
  
  export function getUID(entity):string {
    return <string>_.get(entity, 'metadata.uid');
  }

  export function getNamespace(entity):string {
    // some objects aren't namespaced, so this can return null;
    return <string>_.get(entity, 'metadata.namespace');
  }

  export function getApiVersion(entity):string {
    return <string>_.get(entity, ['apiVersion']);
  }

  export function getLabels(entity):any {
    return _.get(entity, 'metadata.labels') || {};
  }
  
  export function getAnnotations(entity):any {
    return _.get(entity, 'metadata.annotations') || {};
  }

  export function getAnnotation(entity, name):string {
    var annotations = getAnnotations(entity) || {};
    return <string>annotations[name];
  }

  export function getName(entity):string {
    return <string> (_.get(entity, 'metadata.name') || _.get(entity, 'name') || _.get(entity, 'id'));
  }

  export function getKind(entity):string {
    return <string> (_.get(entity, 'metadata.kind') || _.get(entity, 'kind'));
  }

  export function getSelector(entity):any {
    return _.get(entity, 'spec.selector');
  }

  export function getHost(pod):string {
    return <string> (_.get(pod, 'spec.host') || _.get(pod, 'spec.nodeName') || _.get(pod, 'status.hostIP'));
  }

  export function getStatus(pod):any {
    return _.get(pod, 'status.phase');
  }

  export function getPorts(service):any {
    return _.get(service, 'spec.ports');
  }

  export function getCreationTimestamp(entity):any {
    return _.get(entity, 'metadata.creationTimestamp');
  };
}
