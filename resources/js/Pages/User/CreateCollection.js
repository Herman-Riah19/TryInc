import React, { useState } from 'react'
import { Box, Button, Container, Typography, TextField, AppBar, Toolbar, Grid } from '@mui/material'
import { PhotoCamera, ArrowBack } from '@mui/icons-material'
import { useForm, Link } from '@inertiajs/inertia-react'
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
const CreateCollection = ({ user }) => {
  const [imageFile, setImageFile] = useState('')
  const { data, setData, errors } = useForm({
    collectionName: '',
    collectionDescription: '',
    collectionAsset: '',
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
    await fileReader.readAsDataURL(key === 'collectionAsset' && event.target.files[0])
  }

  const classes = useStyle()

  return (
    <Box>
      <AppBar color='background'>
        <Toolbar>
          <Link href={`/profile/${user.username.split(' ').join('_')}`}>
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
            <Grid container spacing={2}>
              <Grid item sm={6} md={4}>
                <Button
                  sx={{ backgroundImage: `url(${imageFile})`, border: 'dashed 2px #05043D' }}
                  className={classes.btnUpload}
                  component='label'>
                  <input
                    margin="normal"
                    type="file"
                    id='collectionAsset'
                    name='collectionAsset'
                    accept='image/*'
                    value={data.collectionAsset}
                    onChange={handleChange}
                    style={{ position: 'absolute', opacity: 0, justifyContent: 'center' }} />
                  {!imageFile && <PhotoCamera />}
                  <span>{errors.collectionAsset}</span>
                </Button>
              </Grid>
              <Grid item sm={6} md={8}>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id='collectionName'
                  name='collectionName'
                  placeholder='Title of Collection'
                  errors={errors.collectionName}
                  value={data.collectionName}
                  onChange={handleChange} />

                <TextField
                  margin="normal"
                  multiline
                  required
                  fullWidth
                  minRows={5}
                  id='collectionDescription'
                  name='collectionDescription'
                  placeholder='Description of your collection'
                  errors={errors.collectionDescription}
                  value={data.collectionDescription}
                  onChange={handleChange} />

              </Grid>
            </Grid>
            <Button sx={{ mt: 5 }} type='submit' variant="contained" color='secondary' fullWidth>Save</Button>
          </form>
        </Box>

      </Container>
    </Box>
  )
}

export default CreateCollection