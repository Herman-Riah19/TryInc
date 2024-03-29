import React, { useState } from 'react'
import { Box, Button, Container, Typography, TextField, MenuItem, AppBar, Toolbar, Grid } from '@mui/material'
import { useForm, Link } from '@inertiajs/inertia-react'
import { PhotoCamera, ArrowBack } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles(() => ({
  btnUpload: {
    width: '350px',
    height: '450px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }
}))

const ProductCreate = ({ categories, auth }) => {
  const [imageFile, setImageFile] = useState('')

  const classes = useStyle()

  const { data, setData, errors } = useForm({
    name: '',
    description: '',
    isFree: false,
    asset: '',
    categorieId: 1,
  })


  const handleChange = async (event) => {
    const key = event.target.id;
    const value = event.target.value
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
    await fileReader.readAsDataURL(key === 'asset' && event.target.files[0])
  }

  return (
    <Box>
      <AppBar color='background'>
        <Toolbar>
          <Link href={`/`}>
            <Button variant='contained' color='primary' startIcon={<ArrowBack />}>
              Back
            </Button>
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
                  sx={{ backgroundImage: `url(${imageFile})`, border: 'dashed 2px #05043D' }}
                  className={classes.btnUpload}
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
                  placeholder='Name of product'
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
                  placeholder='Description of your product'
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

              </Grid>
            </Grid>
            <Button sx={{ mt: 5 }} type='submit' variant="contained" color='secondary' fullWidth>Save</Button>
          </form>
        </Box>

      </Container>
    </Box>
  )
}

export default ProductCreate