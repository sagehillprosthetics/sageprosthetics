import React from 'react'
import Head from 'next/head'
import Button from 'grommet/components/Button'

export default () => (
  <div>
    <Head>
      <link href="//cdnjs.cloudflare.com/ajax/libs/grommet/1.0.1/grommet.min.css" rel="stylesheet" type="text/css" />
    </Head>
    <h2>Demo of Grommet button with next.js</h2>
    <Button label="Sample Grommet Button" primary={true} onClick={function() {}} />
  </div>
)
