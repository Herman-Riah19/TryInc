import { Box, Container, Grid, Typography, Toolbar, Tabs, Tab } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../../Components/MenuBar/Navbar'
import CardProduct from "../../Components/Card/CardProduct"
import CardPost from "../../Components/Card/CardPost"
import Footer from '../../Components/Footer/Footer'
import { TabPanel } from '../../Components/TabImage'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import Title from '../../Components/Title'

import { Swiper, SwiperSlide } from 'swiper/react';

const style = {
  section: {
    position: 'relative',
    width: 'auto',
    margin: '10px'
  },
}

const Collections = ({ auth, avatarUrl, authenticateProfile, categories, products, productUrl, posts, postUrl, users }) => {

  const [value, setValue] = useState(0)

  console.log(categories)

  const handleChange = (event, newValue) => {
    event.preventDefault()
    setValue(newValue);
  };

  const findUserById = (index) => {
    let user = new Object()
    users.map((data) => {
      if (data.id == index)
        user = data
    })
    return user
  }

  const findProductByCategorieId = (id) => {
    console.log(id)
    const productsInThisCategorie = new Object([])
    products.map(product => {
      if (product.categorie_id == id) {
        productsInThisCategorie.push(product)
      }
    })
    return productsInThisCategorie
  }

  return (
    <Box>
      <Navbar auth={auth} authAvatar={authenticateProfile ? `${avatarUrl}/${authenticateProfile.avatar}` : null} />
      <Container sx={{ mt: '100px' }}>
        <Container sx={style.section}>
          <Toolbar
            component="nav"
            variant="container"
            sx={{ justifyContent: 'space-between', overflowX: 'auto' }}>

            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example">
              <Tab label='All' sx={{ color: '#c7d4e1', textTransform: 'capitalize' }} />
              {categories.map(section => (
                <Tab
                  label={section.name}
                  sx={{ color: '#c7d4e1', textTransform: 'capitalize' }} />
              ))}
            </Tabs>
          </Toolbar>
        </Container>
        <Container sx={style.section}>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              {products.map(product => {
                const user = findUserById(product.user_id)
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <CardProduct product={product} username={user.username} url={productUrl} />
                  </Grid>
                )
              })}
            </Grid>
          </TabPanel>
          {categories.map(categorie => {
            const productsInThisCategorie = findProductByCategorieId(categorie.id)

            const key = categories.length - categorie.id + 1
            return (
              <TabPanel value={value} index={key}>
                <Grid container spacing={2}>
                  {productsInThisCategorie.map(product => {
                    const user = findUserById(product.user_id)
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3}>
                        <CardProduct product={product} username={user.username} url={productUrl} />
                      </Grid>
                    )
                  })}
                </Grid>
              </TabPanel>
            )
          })}
        </Container>

        <Container sx={style.section}>
          <Title title='Blog post' link={'/posts'} />
          <Swiper
            modules={[Navigation, A11y]}
            breakpoints={{
              425: {
                slidesPerView: 1,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              1020: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 10
              },
            }}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {posts.map(post => (
              <SwiperSlide>
                <CardPost
                  title={post.title}
                  slug={post.slug}
                  content={post.description}
                  imageUrl={`${postUrl}/${post.post_image}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>

      </Container>
      <Footer auth={auth} />
    </Box>
  )
}

export default Collections