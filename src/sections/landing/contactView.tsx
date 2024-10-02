/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { LoadingButton } from '@mui/lab'
import { Box , Grid, Link, Stack, TextField, Typography } from '@mui/material'
import { CallOutlined, EmailOutlined, LocationOnOutlined } from '@mui/icons-material'

export default function ContactView() {

  const formik = useFormik({
    initialValues: {
      email: '',
      subject: '',
      name: '',
      message: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Enter a valid email address').required('Email is required'),
      subject: Yup.string().required('Subject is required'),
      name: Yup.string().required('Subject is required'),
      message: Yup.string().required('Subject is required')
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  })

  return (
    <>
      <Box sx={{ margin: 0, padding: '10px', border: "1px solid #E3E3E3", borderLeft: "none", borderRight: "none", background: "#FCFDFD" }}>
        <Typography variant="h4" textAlign="center">Contact Us</Typography>
      </Box>

      <Grid container spacing={6} sx={{ padding: "20px", width: "60%", margin: "30px auto", borderRadius: "10px"}}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h5'>Send Message</Typography>
          <Typography>Fill out the form, we&apos;ll be in touch</Typography>

          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3} margin="2rem 0">
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="hello@gmail.com"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                id="subject"
                name="subject"
                label="Subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                placeholder="Input message subject"
                error={formik.touched.subject && Boolean(formik.errors.subject)}
                helperText={formik.touched.subject && formik.errors.subject}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder='John Doe'
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                id='message'
                type='textarea'
                name="message"
                label="Your Message"
                value={formik.values.message}
                onChange={formik.handleChange}
                placeholder="Enter message"
                error={formik.touched.message && Boolean(formik.errors.message)}
                helperText={formik.touched.message && formik.errors.message}
                InputLabelProps={{ shrink: true }}
                sx={{ mb: 3 }}
                multiline
                rows={5}
              />

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                loading={formik.isSubmitting}
              >
                Send
              </LoadingButton>
            </Stack>
          </form>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box sx={{ background: "linear-gradient(to bottom,#F3F6F8,#FFFFFF)", height: "100%", padding: "30px", borderRadius: "10px" }}>
            <Typography variant='h5'>Contact Information</Typography>
            <Box sx={{ margin: "30px 0" }}>
              <Grid display="flex" margin="5px 0" gap="5px">
                <LocationOnOutlined color='primary' />
                <Typography fontWeight={700}>Address:</Typography>
              </Grid>
              <Typography>The Nigeria Police Force, Force headquarters, Louis Edet House. Area 11, Garki, Abuja.</Typography>
            </Box>

            <Box sx={{ margin: "30px 0" }}>
              <Grid display="flex" margin="5px 0" gap="5px">
                <EmailOutlined color='primary' />
                <Typography fontWeight={700}>Email:</Typography>
              </Grid>
              <Link href="mailto:info@possap.gov.ng" color="#1C252E">info@possap.gov.ng</Link>
            </Box>

            <Box sx={{ margin: "30px 0" }}>
              <Grid display="flex" margin="5px 0" gap="5px">
                <CallOutlined color='primary' />
                <Typography fontWeight={700}>Call:</Typography>
              </Grid>
              <Link href="tel:02018884040" color="#1C252E">02018884040</Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
