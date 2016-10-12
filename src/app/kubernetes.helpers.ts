
import * as URI from 'urijs';
import * as _ from 'lodash';

import { Logger } from './log.service';

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

export class WatchTypes {
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
      WatchTypes.DAEMONSETS,
      WatchTypes.REPLICA_SETS,
      WatchTypes.DEPLOYMENTS
    ];
  }
}

export class Kinds {
  // Vanilla Kubernetes types
  public static get k8s(): Array<string> {
    return [
      WatchTypes.CONFIG_MAPS,
      WatchTypes.ENDPOINTS,
      WatchTypes.EVENTS,
      WatchTypes.INGRESSES,
      WatchTypes.NODES,
      WatchTypes.PERSISTENT_VOLUMES,
      WatchTypes.PERSISTENT_VOLUME_CLAIMS,
      WatchTypes.PODS,
      WatchTypes.REPLICATION_CONTROLLERS,
      WatchTypes.RESOURCE_QUOTAS,
      WatchTypes.PERSISTENT_VOLUMES,
      WatchTypes.SECRETS,
      WatchTypes.SERVICES,
      WatchTypes.SERVICE_ACCOUNTS,
      WatchTypes.REPLICA_SETS,
      WatchTypes.DEPLOYMENTS
    ];
  }
  // Openshift specific types
  public static get os(): Array<string> {
    return [
      WatchTypes.TEMPLATES,
      WatchTypes.BUILD_CONFIGS,
      WatchTypes.ROUTES,
      WatchTypes.BUILDS,
      WatchTypes.BUILD_CONFIGS,
      WatchTypes.DEPLOYMENT_CONFIGS,
      WatchTypes.IMAGES,
      WatchTypes.IMAGE_STREAMS,
      WatchTypes.IMAGE_STREAM_TAGS,
      WatchTypes.OAUTH_CLIENTS,
      WatchTypes.POLICIES,
      WatchTypes.POLICY_BINDINGS,
      WatchTypes.PROJECTS,
      WatchTypes.ROLE_BINDINGS,
      WatchTypes.ROLES
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
      case WatchTypes.POLICIES:
      case WatchTypes.OAUTH_CLIENTS:
      case WatchTypes.NAMESPACES:
      case WatchTypes.NODES:
      case WatchTypes.PERSISTENT_VOLUMES:
      case WatchTypes.PROJECTS:
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
    if (kind === WatchTypes.NAMESPACES) {
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
    if (kind === WatchTypes.IMAGES) {
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
      case WatchTypes.LIST: return KindTypes.LIST;
      case WatchTypes.ENDPOINTS:  return KindTypes.ENDPOINTS; 
      case WatchTypes.EVENTS:  return KindTypes.EVENTS; 
      case WatchTypes.NAMESPACES:  return KindTypes.NAMESPACES; 
      case WatchTypes.NODES:  return KindTypes.NODES; 
      case WatchTypes.PERSISTENT_VOLUMES:  return KindTypes.PERSISTENT_VOLUMES; 
      case WatchTypes.PERSISTENT_VOLUME_CLAIMS:  return KindTypes.PERSISTENT_VOLUME_CLAIMS; 
      case WatchTypes.PODS:  return KindTypes.PODS; 
      case WatchTypes.REPLICATION_CONTROLLERS:  return KindTypes.REPLICATION_CONTROLLERS; 
      case WatchTypes.REPLICA_SETS:  return KindTypes.REPLICA_SETS; 
      case WatchTypes.RESOURCE_QUOTAS:  return KindTypes.RESOURCE_QUOTAS; 
      case WatchTypes.OAUTH_CLIENTS:  return KindTypes.OAUTH_CLIENTS; 
      case WatchTypes.SECRETS:  return KindTypes.SECRETS; 
      case WatchTypes.SERVICES:  return KindTypes.SERVICES; 
      case WatchTypes.SERVICE_ACCOUNTS:  return KindTypes.SERVICE_ACCOUNTS; 
      case WatchTypes.CONFIG_MAPS:  return KindTypes.CONFIG_MAPS; 
      case WatchTypes.INGRESSES:  return KindTypes.INGRESSES; 
      case WatchTypes.TEMPLATES:  return KindTypes.TEMPLATES; 
      case WatchTypes.ROUTES:  return KindTypes.ROUTES; 
      case WatchTypes.BUILD_CONFIGS:  return KindTypes.BUILD_CONFIGS; 
      case WatchTypes.BUILDS:  return KindTypes.BUILDS; 
      case WatchTypes.DEPLOYMENT_CONFIGS:  return KindTypes.DEPLOYMENT_CONFIGS; 
      case WatchTypes.DEPLOYMENTS:  return KindTypes.DEPLOYMENTS; 
      case WatchTypes.IMAGES:  return KindTypes.IMAGES; 
      case WatchTypes.IMAGE_STREAMS:  return KindTypes.IMAGE_STREAMS; 
      case WatchTypes.IMAGE_STREAM_TAGS:  return KindTypes.IMAGE_STREAM_TAGS; 
      case WatchTypes.POLICIES:  return KindTypes.POLICIES; 
      case WatchTypes.POLICY_BINDINGS:  return KindTypes.POLICY_BINDINGS; 
      case WatchTypes.PROJECTS:  return KindTypes.PROJECTS; 
      case WatchTypes.ROLE_BINDINGS:  return KindTypes.ROLE_BINDINGS; 
      case WatchTypes.ROLES:  return KindTypes.ROLES; 
      case WatchTypes.DAEMONSETS:  return KindTypes.DAEMONSETS; 
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
      case KindTypes.LIST: return WatchTypes.LIST;
      case KindTypes.ENDPOINTS:  return WatchTypes.ENDPOINTS; 
      case KindTypes.EVENTS:  return WatchTypes.EVENTS; 
      case KindTypes.NAMESPACES:  return WatchTypes.NAMESPACES; 
      case KindTypes.NODES:  return WatchTypes.NODES; 
      case KindTypes.PERSISTENT_VOLUMES:  return WatchTypes.PERSISTENT_VOLUMES; 
      case KindTypes.PERSISTENT_VOLUME_CLAIMS:  return WatchTypes.PERSISTENT_VOLUME_CLAIMS; 
      case KindTypes.PODS:  return WatchTypes.PODS; 
      case KindTypes.REPLICATION_CONTROLLERS:  return WatchTypes.REPLICATION_CONTROLLERS; 
      case KindTypes.REPLICA_SETS:  return WatchTypes.REPLICA_SETS; 
      case KindTypes.RESOURCE_QUOTAS:  return WatchTypes.RESOURCE_QUOTAS; 
      case KindTypes.OAUTH_CLIENTS:  return WatchTypes.OAUTH_CLIENTS; 
      case KindTypes.SECRETS:  return WatchTypes.SECRETS; 
      case KindTypes.SERVICES:  return WatchTypes.SERVICES; 
      case KindTypes.SERVICE_ACCOUNTS:  return WatchTypes.SERVICE_ACCOUNTS; 
      case KindTypes.CONFIG_MAPS:  return WatchTypes.CONFIG_MAPS; 
      case KindTypes.INGRESSES:  return WatchTypes.INGRESSES; 
      case KindTypes.TEMPLATES:  return WatchTypes.TEMPLATES; 
      case KindTypes.ROUTES:  return WatchTypes.ROUTES; 
      case KindTypes.BUILD_CONFIGS:  return WatchTypes.BUILD_CONFIGS; 
      case KindTypes.BUILDS:  return WatchTypes.BUILDS; 
      case KindTypes.DEPLOYMENT_CONFIGS:  return WatchTypes.DEPLOYMENT_CONFIGS; 
      case KindTypes.DEPLOYMENTS:  return WatchTypes.DEPLOYMENTS; 
      case KindTypes.IMAGES:  return WatchTypes.IMAGES; 
      case KindTypes.IMAGE_STREAMS:  return WatchTypes.IMAGE_STREAMS; 
      case KindTypes.IMAGE_STREAM_TAGS:  return WatchTypes.IMAGE_STREAM_TAGS; 
      case KindTypes.POLICIES:  return WatchTypes.POLICIES; 
      case KindTypes.POLICY_BINDINGS:  return WatchTypes.POLICY_BINDINGS; 
      case KindTypes.PROJECTS:  return WatchTypes.PROJECTS; 
      case KindTypes.ROLE_BINDINGS:  return WatchTypes.ROLE_BINDINGS; 
      case KindTypes.ROLES:  return WatchTypes.ROLES; 
      case KindTypes.DAEMONSETS:  return WatchTypes.DAEMONSETS; 
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

  export function setPathOverride(kind:string, fn:(apiServerUri:uri.URI, kind:string, namespace?:string, name?:string) => string):void {
    pathOverrides[toCollectionName(kind)] = fn;
  }

  export function getPathOverride(kind:string):(apiServerUri:uri.URI, kind:string, namespace?:string, name?:string) => string {
    return <(apiServerUri:uri.URI, kind:string, namespace?:string, name?:string) => string> _.get(pathOverrides, toCollectionName(kind));
  }

  export function path(apiServerUri:uri.URI, kind:string, namespace?:string, name?:string) {
    // avoid mutating the passed in URI object
    apiServerUri = apiServerUri.clone();
    kind = toCollectionName(kind);
    var pathOverride = getPathOverride(kind);
    if (pathOverride) {
      return pathOverride(apiServerUri, kind, namespace, name);
    }
    if (namespaced(kind) && !namespace) {
      throw "No namespace supplied for path, '" + kind + "' is only in a namespace";
    }
    apiServerUri.segment(prefixForKind(kind));
    if (namespace) {
      apiServerUri.segment('namespaces').segment(namespace);
    }
    apiServerUri.segment(kind);
    if (name) {
      apiServerUri.segment(name);
    }
    return apiServerUri.toString();
  }

  export function pathForObject(apiServerUri:uri.URI, obj:any, useName:boolean = true) {
    var kind = getKind(obj);
    var namespace:string = undefined;
    if (namespaced(kind)) {
      namespace = getNamespace(obj);
    }
    var name:string = undefined;
    if (useName) {
      name = getName(obj);
    }
    return path(apiServerUri, kind, namespace, name);
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
