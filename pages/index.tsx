import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {useEffect, useRef, useState} from 'react'
import Modal from '../components/Modal'
import cloudinary from '../utils/cloudinary'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import { SpeedInsights } from '@vercel/speed-insights/next';

const Home: NextPage = ({ images }: { images: ImageProps[] }) => {
  const router = useRouter()
  const { year } = router.query
  const { photoId } = router.query
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (year: string | string[]) => {
    setIsLoading(true);
  }

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: 'center' })
      setLastViewedPhoto(null)
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto])

  return (
      <>
        <Head>
          <title>Galerie Photo Bloodrun</title>
        </Head>
        <main className="mx-auto max-w-[1960px] p-4 bg-base-300">
          {photoId && (
              <Modal
                  images={images}
                  onClose={() => {
                    setLastViewedPhoto(photoId)
                  }}
              />
          )}
          <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
            <div
                className="after:content relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex max-h-full max-w-full items-center justify-center">
              </span>
                <span
                    className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
              </div>
              <Image src="/Logo_NoText.svg"
                     alt="Blood Run Galerie"
                     width={270}
                     height={270}
                     quality={100}
                     className="max-w-lg rounded-lg drop-shadow-xl"/>
              <h1 className="mt-8 mb-4 text-2xl font-bold uppercase tracking-widest">
                Blood Run {year}
              </h1>
              <p className="max-w-[40ch] sm:max-w-[32ch]">
                Voici les photos de la Blood Run {year} ! Retrouvez ici les photos des différentes éditions de la Blood
                Run !
              </p>
              <a
                  className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
                  href="/yearSelection"
                  onClick={() => handleClick(year)}
              >
                Les différentes éditions
              </a>
            </div>
            {images.map(({id, public_id, format, blurDataUrl}) => {
              const isVideo = format === 'mp4'; // Ajoutez d'autres formats vidéo si nécessaire

              return (
                  <Link
                      key={id}
                      href={`/?photoId=${id}`}
                      as={`/p/${id}`}
                      ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                      shallow
                      className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                  >
                    {isVideo ? (
                        <video
                            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                            style={{transform: 'translate3d(0, 0, 0)'}}
                            placeholder="blur"
                            width={720}
                            height={480}
                        >
                          <source
                              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload/c_scale,w_720/${public_id}.${format}`}
                              type={`video/${format}`}/>
                          Désolé, votre navigateur ne supporte pas les vidéos intégrées.
                        </video>
                    ) : (
                        <Image
                            alt="Next.js Conf photo"
                            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                            style={{transform: 'translate3d(0, 0, 0)'}}
                            placeholder="blur"
                            blurDataURL={blurDataUrl}
                            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                            width={720}
                            height={480}
                            sizes="(max-width: 640px) 100vw,
                          (max-width: 1280px) 50vw,
                          (max-width: 1536px) 33vw,
                          25vw"
                        />
                    )}
                  </Link>
              );
            })}
          </div>
        </main>
        <footer className="footer p-10 bg-base-200">
          <aside>
            <Image src={"/Logo_DDNLVDG.png"}
                   alt={"Logo Donneurs du sang de la Vallée du Gapeau"}
                   width={100}
                   height={100}
            ></Image>
            <p>Donneurs de sang<br/>La Vallée du Gapeau</p>
          </aside>
          <aside>
            <Image src={"/Logo_NoText.svg"}
                   alt={"Logo Blood Run"}
                   width={100}
                   height={100}
            ></Image>
            <p>The Blood Run<br/>La course pour le don du sang</p>
          </aside>
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <a href="https://www.instagram.com/thebloodrun_83/">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     className="fill-current">
                  <path
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a href="https://www.facebook.com/profile.php?id=100078840911103">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     className="fill-current">
                  <path
                      d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </nav>

        </footer>
        {isLoading && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
        )}
        <SpeedInsights />
      </>
  )
}

export default Home


export const getServerSideProps: GetServerSideProps = async (context) => {
  let {year} = context.query;
  console.log('year', year);

  const subfolders = await cloudinary.v2.api.sub_folders(process.env.CLOUDINARY_FOLDER)

  // Extract the names of the subfolders
  const years = subfolders.folders.map(folder => folder.name)


  if (!years.includes(year)) {
    return {
      redirect: {
        destination: '/yearSelection',
        permanent: false,
      },
    }
  }

  const results = await cloudinary.v2.search
      .expression(`folder:${process.env.CLOUDINARY_FOLDER}/${year}/*`)
      .sort_by('public_id', 'desc')
      .max_results(400)
      .execute()
  let reducedResults: ImageProps[] = []

  let i = 0
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    })
    i++
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image)
  })
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises)

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i]
  }

  return {
    props: {
      images: reducedResults,
    },
  }
}
