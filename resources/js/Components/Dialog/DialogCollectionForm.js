import React, { forwardRef, useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Slide, TextField, Button } from '@mui/material'
import { PhotoCamera } from '@mui/icons-material'
import { router } from '@inertiajs/react'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogCollectionForm = (props) => {
    const { onClose, open, userId } = props

    const [imageFile, setImageFile] = useState('')

    const [data, setData] = useState({
        collection_name: '',
        collection_description: '',
        collection_collection_asset: '',
        user_id: userId
    })

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleSubmit = (value) => {
        router.post('/product/create/collection', data)
        onClose(value);
    };

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
        await fileReader.readAsDataURL(key === 'collection_asset' && event.target.files[0])
    }

    const classes = {
        btnUpload: {
            width: '100%',
            height: '250px',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: 'dashed 2px #05043D',
            backgroundImage: `url(${imageFile})`
          }
    }

    return (
        <Dialog onClose={handleClose} open={open} TransitionComponent={Transition}>
            <DialogTitle>{"Create new Collection"}</DialogTitle>
            <form method='POST' encType="multipart/form-data">
                <DialogContent sx={{m: 0}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id='collection_name'
                        name='collection_name'
                        placeholder='The of the collection'
                        value={data.collection_name}
                        onChange={handleChange} />

                    <TextField
                        margin="normal"
                        multiline
                        required
                        fullWidth
                        minRows={3}
                        id='collection_description'
                        name='collection_description'
                        placeholder='The description of your post'
                        value={data.collection_description}
                        onChange={handleChange} />

                    <Button
                        sx={classes.btnUpload}
                        component='label'>
                        <input
                            margin="normal"
                            type="file"
                            id='collection_asset'
                            name='collection_asset'
                            accept='image/*'
                            value={data.collection_asset}
                            onChange={handleChange}
                            style={{ position: 'absolute', opacity: 0, justifyContent: 'center' }} />
                        {!imageFile && <PhotoCamera />}
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button fullWidth variant='contained' color='secondary' type='submit' onClick={handleSubmit}>
                        Save collection
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default DialogCollectionForm