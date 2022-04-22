import React, { Component, useState } from 'react';
import { shared } from '../constants';
import api from '../api';
import axios from 'axios';

import styled from 'styled-components';

const Title = styled.h1.attrs({
  className: 'h1',
})``;

const Wrapper = styled.div.attrs({
  className: 'form-group',
})`
  margin-top: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
  max-width: 30%;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const InputText = styled.input.attrs({
  className: 'form-control',
})`
  margin: 5px auto;
  max-width: 30%;
  text-align: center;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const Fieldset = styled.fieldset.attrs({
  className: 'form-control',
})`
  background-color: transparent;
  border-color: transparent;
  margin: 1em auto 0.5em;
  max-width: 50%;
  min-height: 6em;

  @media screen and (max-width: 420px) {
    height: auto;
    max-width: 75%;
  }
`;

const DayInput = styled.input.attrs({
  className: '',
})`
  margin: 5px 5px 5px auto;
  text-align: center;
`;

const Button = styled.button.attrs({
  className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
`;

const ItemInsert = () => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const handleChangeInputName = async event => {
    const name = event.target.value;
    setName(name);
  };

  const insertSingleItem = item => {
    return api
      .insertItem(item)
      .then(resp => {
        console.log('insertItem: resp');
        console.log(resp);
        if ((resp.data || {}).success) {
          const newItem = JSON.parse(resp.config.data);
          console.log('insertItem: newItem', newItem);
        }
        return resp;
      })
      .catch(err => {
        console.error(`ERROR in 'insertSingleItem': ${err}`);
        console.error(err);
        return err;
      });
  };

  const handleInsertItem = event => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    axios
      .post('http://localhost:3000/api/item', formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      .then(res => {
        console.log(`Success` + res.data);
        window.location.href = '/items';
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleChangeFile = event => {
    if (!event.target.files[0]) return;
    setFile(event.target.files[0]);
  };

  return (
    <Wrapper>
      <Title>Subir Evidencias</Title>

      <Label>Nombre: </Label>
      <InputText type="text" value={name} onChange={handleChangeInputName} />
      <Fieldset>
        <Label>Subir un documento</Label>
        <input
          type="file"
          name="file"
          className="form-control"
          id="customFile"
          onChange={handleChangeFile}
        />
      </Fieldset>
      <Button onClick={handleInsertItem}>Subir</Button>
      <CancelButton href={'/items'}>Cancelar</CancelButton>
    </Wrapper>
  );
};

export default ItemInsert;
