import React from 'react'
import { Grid, Paper, Stack, Typography, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from '@inertiajs/inertia-react'

const useStyles = makeStyles(theme => ({
  root: {
    height: '500px',
    marginTop: 154,
  },
  logoBlock: {
    paddingRight: 130
  },
  logoTitle: {
    marginTop: 26,
    fontSize: 24
  },
  logoSubTitle: {
    fontSize: 18
  },
  paper: {
    marginTop: 30,
    padding: 50,
    paddingBottom: 52,
    borderRadius: 50
  },
  title: {
    fontSize: 18,
    fontWeight: 800,
  },
  link: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    textDecoration: 'none',
    transition: '.2s ease-in 0s',
  },
  linksHolder: {
    alignContent: 'flex-start'
  },
  copyrightSection: {
    marginTop: 50,
  },
  footerText: {
    marginRight: 'auto'
  },
  footerLink: {
    fontSize: 14,
    textDecoration: 'none',
    transition: '.2s ease-in 0s',
  },
}))

const Footer = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <Grid className={classes.root} justifyContent='center' container component='footer' >
      <Grid item xs={12} md={9}>
        <Paper className={classes.paper} elevation={0}>
          <Grid container spacing={4}>
            <Grid item className={classes.logoBlock} xs={12} lg={6} direction='column' alignItems='flex-start'>
              <Typography variant='h3' className={classes.logoTitle} paragraph>
                Trink
              </Typography>
              <Typography className={classes.logoSubTitle} variant="body1Semi" paragraph>
                This is the new artiste platform to sell and buy an digital drawing using NFT technologie
              </Typography>
            </Grid>
            <Grid container item xs={12} lg={6} spacing={4}>
              <Grid
                className={classes.linksHolder}
                container
                item
                xs={12}
                sm={6}
                lg={3}
                direction="column"
                alignContent="flex-end"
              >
                <Typography className={classes.title} variant="h6" paragraph>
                  Editions
                </Typography>
                <Link href='/' className={classes.link}>
                  Home
                </Link>
                <Link href='/' className={classes.link}>
                  Profile
                </Link>
                <Link href='/' className={classes.link}>
                  Create
                </Link>
              </Grid>

              <Grid
                className={classes.linksHolder}
                container
                item
                xs={12}
                sm={6}
                lg={5}
                direction="column"
                alignContent="flex-end"
              >
                <Typography className={classes.title} variant="h6" paragraph>
                  About us
                </Typography>
                <Link href='/' className={classes.link}>
                  Team
                </Link>
                <Link href='/' className={classes.link}>
                  Documentation
                </Link>
                <Link href='/' className={classes.link}>
                  Partener
                </Link>
                <Link href='/' className={classes.link}>
                  Donate
                </Link>
              </Grid>

              <Grid
                className={classes.linksHolder}
                container
                item
                xs={12}
                sm={6}
                lg={3}
                direction="column"
                alignContent="flex-end"
              >
                <Typography className={classes.title} variant="h6" paragraph>
                  Social
                </Typography>
                <Link className={classes.link} href="https://www.facebook.com" >
                  Facebook
                </Link>
                <Link className={classes.link} href="https://twitter.com" >
                  Twitter
                </Link>
                <Link
                  className={classes.link} href="https://www.instagram.com">
                  Instagram
                </Link>
                <Link className={classes.link} href="https://discord.gg" >
                  Discord
                </Link>
                <Link className={classes.link} href="https://www.linkedin.com" >
                  LinkedIn
                </Link>
              </Grid>
            </Grid>
            <Grid className={classes.copyrightSection} item xs={12}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 10, lg: 20 }}
                justifyContent="center"
                alignItems="center">
                <Typography className={classes.footerText} variant="body2">
                  © 2022 Trink. All rights reserved.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Link className={classes.footerLink} href="/">
                    <Stack direction="row">
                      Warrant Canary
                    </Stack>
                  </Link>
                  <Link className={classes.footerLink} href="/">
                    Privacy Policy
                  </Link>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Footer