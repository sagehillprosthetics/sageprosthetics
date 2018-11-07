import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Head from 'next/head'
import App from 'grommet/components/App'
import Box from 'grommet/components/Box'
import Header from 'grommet/components/Header'
import Footer from 'grommet/components/Footer'
import Meter from 'grommet/components/Meter'
import Title from 'grommet/components/Title'
import Value from 'grommet/components/Value'

export default () => (
  <div>
    <Head>
      <link href="//cdnjs.cloudflare.com/ajax/libs/grommet/1.0.1/grommet.min.css" rel="stylesheet" type="text/css" />
    </Head>

    <App centered={false}>
      <Header direction="row" justify="between"
        pad={{ horizontal: 'medium' }}>
        <Title>Grommet standalone</Title>
      </Header>
      <Box pad='medium'>
        <Meter value={40} />
      </Box>
      <Footer primary={true} appCentered={true} direction="column"
        align="center" pad="small" colorIndex="grey-1">
        <p>
          Build your ideas with <a href="http://grommet.io" target="_blank">Grommet</a>!
        </p>
      </Footer>
    </App>
  </div>
)
