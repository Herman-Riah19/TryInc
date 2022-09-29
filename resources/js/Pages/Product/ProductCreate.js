import React, { useState } from 'react'
import { Box, Button, Container, Typography, TextField, MenuItem,  AppBar, Toolbar, IconButton, Grid } from '@mui/material'
import { useForm, Link } from '@inertiajs/inertia-react'
import { PhotoCamera,ArrowBack } from '@mui/icons-material'

const ProductCreate = ({ categories }) => {
  const [imageFile, setImageFile] = useState('')

  const { data, setData, errors } = useForm({
    name: '',
    description: '',
    price: 0,
    asset: '',
    categorieId: 1
  })

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value
    setData(values => ({
      ...values,
      [key]: value,
    }))

    const fileReader = new FileReader()
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        setImageFile(fileReader.result)
      }
    }
    fileReader.readAsDataURL(key === 'asset' && e.target.files[0])
  }


  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Link href={`/`}>
            <IconButton variant='contained'>
              <ArrowBack />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Container component="main">
        <Box sx={{ marginTop: 8 }} >
          <Typography variant='h4' sx={{ textAlign: 'center' }}>
            Create a new Product
          </Typography>
          <form method="post" encType="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item sm={6} md={4}>
                <Button
                  sx={{
                    width: '250px',
                    height: '450px',
                    backgroundImage: `url(${imageFile})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                  component='label'>
                  <input
                    margin="normal"
                    type="file"
                    id='asset'
                    name='asset'
                    accept='image/*'
                    value={data.asset}
                    onChange={handleChange}
                    style={{ position: 'absolute', opacity: 0, justifyContent: 'center' }} />
                  {!imageFile && <PhotoCamera />}
                  <span>{errors.asset}</span>
                </Button>
              </Grid>
              <Grid item sm={6} md={8}>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id='name'
                  name='name'
                  placeholder='name of post'
                  errors={errors.name}
                  value={data.name}
                  onChange={handleChange} />
                <TextField
                  margin="normal"
                  multiline
                  required
                  fullWidth
                  minRows={5}
                  id='description'
                  name='description'
                  placeholder='Description of your post'
                  errors={errors.description}
                  value={data.description}
                  onChange={handleChange} />

                <TextField
                  margin='normal'
                  fullWidth
                  select
                  required
                  id='categorieId'
                  name='categorieId'
                  placeholder='Choose your categories type'
                  value={data.categorieId}
                  errors={errors.categorieId}
                  onChange={e => setData('categorieId', parseInt(e.target.value))}>

                  {categories.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  margin="normal"
                  type='number'
                  required
                  fullWidth
                  id='price'
                  name='price'
                  placeholder='price of post'
                  errors={errors.price}
                  value={data.price}
                  onChange={handleChange} />
              </Grid>
            </Grid>
            <Button sx={{mt:5}} type='submit' variant="contained" fullWidth>Buy the Product</Button>
          </form>
        </Box>

      </Container>
    </Box>
  )
}

export default ProductCreate