import React from 'react'
import { Box, TextField, AppBar, Toolbar, Button, Container, Typography, Autocomplete } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useForm, Link } from '@inertiajs/inertia-react'

const AddProductInCollection = ({ products }) => {

  const { data, setData } = useForm({
    products: []
  })
  return (
    <Box>
      <AppBar color='background'>
        <Toolbar>
          <Link href={`/collection/new`}>
            <Button variant='contained' color='primary' startIcon={<ArrowBack />}>
              Back
            </Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Container component="main">
        <Box sx={{ marginTop: 8 }} >
          <Typography variant='h4' sx={{ textAlign: 'center' }}>
            Create a new Collection
          </Typography>
          <form method="post" encType="multipart/form-data">
            <Autocomplete 
              multiple
              id='products'
              options={products}
              getOptionLabel={option => option.name}
              renderInput={params =>(
                <TextField 
                  {...params}
                  variant='standard'
                  label='List des produits'
                  placeholder='List des produit sur cette collection'/>
              )}/>

            <Button sx={{ mt: 5 }} type='submit' variant="contained" color='secondary' fullWidth>Save</Button>
          </form>
        </Box>

      </Container>

    </Box>
  )
}

export default AddProductInCollection