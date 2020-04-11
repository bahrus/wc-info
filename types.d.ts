export interface WCSuiteInfo {
  tags: WCInfo[];
}

export interface WCInfo extends Info {
  path: string | undefined;
  attributes: AttribInfo[] | undefined;
  events: CustomEventInfo[] | undefined;
  properties: PropertyInfo[] | undefined;
  slots: SlotInfo[] | undefined;
  testCaseNames: string[] | undefined;
}

export interface SlotInfo{
  name: string;
  description: string;
}

export interface Info {
  name: string;
  description: string;
}

export interface AttribInfo extends Info {
  defaultValue: string | undefined;
  /**
   * key = test name
   * val = test attribute value
   */
  testValues: { [key: string]: string } | undefined;
  values: Info[] | undefined;
}

export interface PropertyInfo extends Info {
  type: 'string' | 'boolean' | 'object' | 'number' | 'any' | undefined;
  readOnly: boolean;
  defaultValue: any;
  /**
   * key = test name
   * val = test prop value
   */
  testValues: { [key: string]: any } | undefined;
}
export interface CustomEventDetailProperty extends Info {
  type: string | undefined;
  testValue: any | undefined;
}

export interface CustomEventInfo extends Info {
  detail: CustomEventDetailProperty[];
  testExpectedValues: { [key: string]: CustomEventInfo[] } | undefined;
}


