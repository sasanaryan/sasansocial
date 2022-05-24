import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {  InputBase, styled } from '@mui/material';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import AvatarUsername from '../../avatar/AvatarUsername';
import { baseurl } from "../../../config";


const Listbox = styled('ul')({
  width: 100,
  margin: 0,
  padding: '20px',
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  overflow: 'auto',
  backgroundColor:"white",
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  '& li[data-focus="true"]': {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
});


 const Search = () => {
  const [allUser, setAllUser] = useState([]);

  
  useEffect(() => {
    const getAllUser = async () => {
        try {
            const res = await baseurl.get("/users/all");
            setAllUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    getAllUser();
}, []);

const {
    getRootProps,
    getInputProps,
    getListboxProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: allUser,
    getOptionLabel: (option) => option.username,
  });

  return (
    <>
      <div {...getRootProps()}>
        <InputBase {...getInputProps()} />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((user) => (
            <AvatarUsername key={user._id} user={user} search   />
          ))}
        </Listbox>
      ) : null}
    </>
  );
}


export default Search;

