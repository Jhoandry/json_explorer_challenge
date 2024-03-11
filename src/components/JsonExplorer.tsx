import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

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
      childrens: isObject? getDetails(value, pathKey, isArray) : []
    };
  });
}

function renderDetail(detail:Detail, updateSelected: (path: string, value: string) => void) {
  if (detail.clickable) {
    return (
      <li>
        <a href="#" onClick={() => updateSelected(detail.path, detail.value.toString())}>
          { detail.name }
        </a> : <label> {detail.type === "string"? `"${detail.value}"` : detail.value.toString()} </label>
      </li>
    )
  }

  return (
    <li>
      <label> 
        { detail.isArray? `${detail.name}: [` : '{' }
          <ul> {detail.childrens.map(detail => renderDetail(detail, updateSelected))} </ul>
        { detail.isArray? ']' : '}'  }
      </label>
    </li>
  )
};

type Detail = {
  name: string,
  path: string,
  value: any,
  type: string,
  clickable: boolean,
  isArray: boolean,
  childrens: Detail[],
};

interface JsonExplorer {
  json: any
}

function JsonExplorer (props: JsonExplorer) {
  const jsonDetails = getDetails(props.json);
  const [selected, setSelected] = useState({
    path: "",
    value: ""
  });

  const handleKeyChange = (path:string) => {
    selectedChange(path, "test");
  }

  const selectedChange = (path:string, value:string) => {
    setSelected({ 
      ...selected, 
      path: path,
      value: value
    });
  }

  const renderDetails = jsonDetails.map(detail => renderDetail(detail, selectedChange));

  return (
    <>
      <div className="header">
        <Form.Control
          type="text"
          value={selected.path} 
          onChange={event => handleKeyChange(event.target.value)}
          readOnly
        />
        <p>{selected.value}</p>
      </div>

     <p>Response</p>
      <Card>
        <Card.Body>
          <Card.Body>{renderDetails}</Card.Body>
        </Card.Body>
      </Card>
    </>
  )
}

export default JsonExplorer;