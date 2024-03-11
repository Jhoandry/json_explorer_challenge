import React from "react";
import data from '../assets/data.json';

type Detail = {
  name: string;
  value: string;
  type: string;
  clickable: boolean;
  children?: Detail[];
};

function buildKey(key:string, path:string, isParentArray:boolean) {
  if (path) {
    return isParentArray? `${path}.[${key}]` : `${path}.${key}` 
  }
  return key
}

function getDetails(data: object, path:string='', isParentArray:boolean=false): Detail[] {
  return Object.entries(data).map(([key, value]) => {
    let isObject = typeof value === 'object';
    let keyName = buildKey(key, path, isParentArray);
    return {
      name: keyName,
      value: value.toString(),
      type: typeof value,
      clickable: !isObject,
      children: isObject? getDetails(value, keyName, Array.isArray(value)) : []
    };
  });
}

function JsonExplorer () {
  const details = getDetails(data)
  return <>{details.length}</>;
}

export default JsonExplorer;