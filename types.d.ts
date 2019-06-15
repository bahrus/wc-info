export interface Info {
    name: string;
    description: string;
  }
  
  export interface AttribInfo extends Info {}
  
  export interface WCInfo extends Info {
    attributes: AttribInfo[];
  }
  export interface WCSuiteInfo {
    tags: WCInfo[];
  }