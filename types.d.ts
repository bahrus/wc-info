export interface Info {
    name: string;
    description: string;
  }
  
  export interface AttribInfo extends Info {
    values: Info[] | undefined;
  }
  export interface CustomEventInfo extends Info{
    detail: CustomEventDetailProperty[],
    /**
     * Event fires when this property changes
     */
    associatedPropName: string
  }
  export interface PropertyInfo extends Info{
    type: string,
  }
  export interface CustomEventDetailProperty extends Info{
      type: string
  }
  export interface WCInfo extends Info {
    attributes: AttribInfo[] | undefined;
    customEvents: CustomEventInfo[] | undefined;
    properties: PropertyInfo[] | undefined;
  }
  export interface WCSuiteInfo {
    tags: WCInfo[];
  }