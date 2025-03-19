'use client'

import { useState, useEffect } from 'react'
import NProgress from 'nprogress'

const Loading = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, [])

  return null
}

export default Loading