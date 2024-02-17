'use client';
import type {GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import {useRouter} from 'next/router'
import Carousel from '../../components/Carousel'
import getResults from '../../utils/cachedImages'
import cloudinary from '../../utils/cloudinary'
import getBase64ImageUrl from '../../utils/generateBlurPlaceholder'
import type {ImageProps} from '../../utils/types'
import fetchCloudinaryFolders from "../../utils/cloudinaryFolders";


const Home: NextPage = ({currentPhoto}: { currentPhoto: ImageProps }) => {
    const router = useRouter()
    const {photoId} = router.query
    let index = Number(photoId)
    const year = router.query.year as string

    const currentPhotoUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_2560/${currentPhoto.public_id}.${currentPhoto.format}`
    return (
        <>
            <Head>
                <title>Galerie photo Bloodrun</title>
                <meta property="og:image" content={currentPhotoUrl}/>
                <meta name="twitter:image" content={currentPhotoUrl}/>
            </Head>
            <main className="mx-auto max-w-[1960px] p-4">
                <Carousel currentPhoto={currentPhoto} index={index} year={year}/>
            </main>
        </>
    )
}


export default Home

export const getStaticProps: GetStaticProps = async (context) => {
    const {year, photoId} = context.params;

    // Assurez-vous que les valeurs nécessaires sont présentes
    if (!year || !photoId) {
        return {
            notFound: true,
        };
    }

    const results = await cloudinary.v2.search
        .expression(`folder:${process.env.CLOUDINARY_FOLDER}/${year}/*`)
        .sort_by('public_id', 'desc')
        .max_results(400)
        .execute()

    let reducedResults: ImageProps[] = []

    // Get the total number of images in all previous folders
    let totalImagesInPreviousFolders = 0;
    const folders = await fetchCloudinaryFolders();
    for (let folder of folders) {
        if (folder < year) {
            const folderResults = await cloudinary.v2.search
                .expression(`folder:${process.env.CLOUDINARY_FOLDER}/${folder}/*`)
                .execute()
            totalImagesInPreviousFolders += folderResults.resources.length;
        }
    }

    let i = totalImagesInPreviousFolders
    for (let result of results.resources) {
        reducedResults.push({
            id: i, // Assign a year-specific id to each image
            height: result.height,
            width: result.width,
            public_id: result.public_id,
            format: result.format,
        })
        i++
    }

    const currentPhoto = reducedResults.find(
        (img) => img.id === Number(photoId)
    )

    // Si currentPhoto est undefined, retournez null pour currentPhoto dans props
    if (!currentPhoto) {
        return {
            props: {
                currentPhoto: null, // Utilisez null au lieu de undefined
            },
        };
    }

    currentPhoto.blurDataUrl = await getBase64ImageUrl(currentPhoto);

    return {
        props: {
            currentPhoto: currentPhoto,
        },
        revalidate: 60, // Optionnel: ajoutez ceci si vous voulez ISR (Incremental Static Regeneration)
    }
}


export async function getStaticPaths() {
    const folders = await cloudinary.v2.api.sub_folders(process.env.CLOUDINARY_FOLDER)
    // Extract the names of the subfolders
    const years = folders.folders.map(folder => folder.name)

    const paths = [];

    for (const year of years) {
        const folderPath = `${process.env.CLOUDINARY_FOLDER}/${year}`;

        const results = await cloudinary.v2.search
            .expression(`folder:${folderPath}/*`)
            .sort_by('public_id', 'desc')
            .max_results(400)
            .execute();

        for (let i = 0; i < results.resources.length; i++) {
            paths.push({params: {year, photoId: i.toString()}});
        }
    }

    return {
        paths,
        fallback: false,
    };
}
