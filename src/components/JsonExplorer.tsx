import React from "react";
import data from '../assets/data.json';
import Card from 'react-bootstrap/Card';

type Detail = {
  name: string;
  path: string,
  value: any;
  type: string;
  clickable: boolean;
  isArray: boolean;
  children: Detail[];
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
    let isArray = Array.isArray(value);
    let pathKey = buildKey(key, path, isParentArray);
    return {
      name: key,
      path: pathKey,
      value: value,
      type: typeof value,
      clickable: !isObject,
      isArray: isArray,
      children: isObject? getDetails(value, pathKey, isArray) : []
    };
  });
}


function renderDetail(detail:Detail) {
  if (detail.clickable) {
    return (
      <li>
        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
          { detail.name }
        </a> : <label> {detail.value} </label>
      </li>
    )
  }

  return (
    <li>
      <label> 
        { detail.isArray? `${detail.name}: [` : '{' }
          <ul> {detail.children.map(detail => renderDetail(detail))} </ul>
        { detail.isArray? ']' : '}'  }
      </label>
    </li>
  )
};

function JsonExplorer () {
  const details = getDetails(data)
  const renderDetails = details.map(detail => renderDetail(detail));

  return (
    <Card>
      <Card.Body>
        <Card.Title>Response</Card.Title>
        <Card.Body className="response"> {renderDetails} </Card.Body>
      </Card.Body>
    </Card>
  )
}

export default JsonExplorer;