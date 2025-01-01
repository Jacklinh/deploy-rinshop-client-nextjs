'use client'

import Image from 'next/image'
import { useState } from 'react'

const DEFAULT_IMAGE = '/images/noimage.jpg'

interface ImageWithFallbackProps {
    src: string
    alt: string
    width: number
    height: number
    loading?: 'lazy' | 'eager'
}

const ImageWithFallback = ({ src, alt, width, height, loading = 'lazy' }: ImageWithFallbackProps) => {
    const [imgSrc, setImgSrc] = useState(src)

    return (
        <Image
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            onError={() => {
                setImgSrc(DEFAULT_IMAGE)
            }}
        />
    )
}

export default ImageWithFallback 