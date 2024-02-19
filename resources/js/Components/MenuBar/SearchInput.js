import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Button, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useForm } from '@inertiajs/inertia-react';

export const SearchForm = styled('form')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: 'solid 1px #0001',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '100%'
  }
}))

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      width: '50%',
    },
  },
}));

const SearchInput = ({keyWord}) => {

  const { data, setData, error, post } = useForm({
    keyWord: keyWord 
  })

  const handleChange = (event) => {
    const key = event.target.id
    const value = event.target.value

    setData(values => ({
      ...values,
      [key]: value
    }))
  }

  const handleSubmit = (event) => {
    post('/search')
  }

  return (
    <SearchForm action='/search' method='get'>
      <StyledInputBase
        type='search'
        id='keyWord'
        name='keyWord'
        value={data.keyWord}
        onChange={handleChange}
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
      <Button type='submit' onSubmit={handleSubmit}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </Button>
    </SearchForm>
  )
}

export default SearchInput