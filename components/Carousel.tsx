import Image from 'next/image'
import {useRouter} from 'next/router'
import useKeypress from 'react-use-keypress'
import type {ImageProps} from '../utils/types'
import {useLastViewedPhoto} from '../utils/useLastViewedPhoto'
import SharedModal from './SharedModal'

export default function Carousel({
                                     index,
                                     currentPhoto,
                                     year
                                 }: {
    index: number
    currentPhoto: ImageProps
    year: string
}) {
    const router = useRouter()
    const [, setLastViewedPhoto] = useLastViewedPhoto()

    function closeModal() {
        setLastViewedPhoto(currentPhoto.id)
        router.push(`/?year=${year}`, undefined, {shallow: true})
    }

    function changePhotoId(newVal: number) {
        router.push(`/?photoId=${newVal}&year=${year}`, `/p/${newVal}?year=${year}`, {shallow: true})
    }

    useKeypress('Escape', () => {
        closeModal()
    })

    const isVideo = currentPhoto.format === 'mp4';

    // URL de la vidéo - à ajuster selon votre logique
    const videoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/${currentPhoto.public_id}.${currentPhoto.format}`;


    return (
        <div className="fixed inset-0 flex items-center justify-center">
            <button
                className="absolute inset-0 z-30 cursor-default bg-black backdrop-blur-2xl"
                onClick={closeModal}
            >
                {isVideo ? (
                    <video
                        className="pointer-events-none h-full w-full"
                        autoPlay
                        loop
                    >
                        <source src={currentPhoto.blurDataUrl}/>
                    </video>
                ) : (
                    <Image
                        src={currentPhoto.blurDataUrl}
                        className="pointer-events-none h-full w-full"
                        alt="blurred background"
                        fill
                        priority={true}
                    />
                )}
            </button>
            <SharedModal
                index={index}
                changePhotoId={changePhotoId}
                currentPhoto={currentPhoto}
                closeModal={closeModal}
                navigation={false}
                year={year}
            />
        </div>
    )
}
