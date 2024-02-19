import Link from 'next/link'
import Image from 'next/image'
import cloudinary from "../utils/cloudinary";
import {NextPage} from "next";
import Head from "next/head";
import {useState} from "react";

const YearSelection: NextPage = ({years}: { years: { year: string, firstImage: any, count: number }[] }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (year: string) => {
        setIsLoading(true);
    }
    return (
        <><Head>
            <title>Galerie Photo Bloodrun</title>
        </Head>
            <div className="hero min-h-screen bg-base-200">
                <div className="absolute top-10 left-10">
                    <a href="https://bloodrun.fr" className="btn btn-outline">
                        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
                        </svg>
                        Retourner à l'accueil</a>
                </div>
                <div className="hero-content flex-col lg:flex-row break-words p-4 lg:p-0">
                    <Image src="/Logo_NoText.svg"
                           alt="Blood Run Galerie"
                           width={500}
                           height={500}
                           quality={100}
                           className="max-w-xs lg:max-w-lg mx-auto rounded-lg drop-shadow-xl"/>
                    <div>
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Galerie Blood Run</h1>
                            <p className="py-6">Retrouvez ici les photos des différentes éditions de la Blood Run !</p>
                            <div className="flex justify-center lg:justify-start">
                                <a href="#yearSelection"
                                   className="btn bg-red-800 focus:bg-red-900 focus:border-0 hover:bg-red-900 border-0 hover:border-0 text-neutral-300 focus:outline-none focus:ring-0 active:bg-red-900">
                                    Commencer
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="yearSelection"
                 className="flex flex-wrap justify-center bg-base-300 gap-4 mx-auto p-4 min-h-screen">
                {years.map(({year, firstImage, count}) => (
                    firstImage ? (
                        <div key={year}
                             className="card w-96 lg:w-1/3 bg-base-100 shadow-xl m-2 h-1/2 ">
                            <figure className="w-full h-64 relative">
                                <Image
                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${firstImage.public_id}.${firstImage.format}`}
                                    alt={year}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title text-3xl">Blood Run {year}</h2>
                                <p>{count} images disponibles</p>
                                <div className="card-actions justify-end">
                                    <Link href={`/?year=${year}`}
                                          className="btn bg-red-800 hover:bg-red-900 border-0 hover:border-0 focus:bg-red-900 focus:border-0 text-neutral-300"
                                          onClick={() => handleClick(year)}>
                                        Voir les photos
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : null
                ))}
                <h2 className="w-full text-3xl font-bold mt-8 text-center">Les années précédentes arriveront bientôt
                    !</h2>
            </div>

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

        </>
    )
}

export default YearSelection

export async function getServerSideProps() {
    const subfolders = await cloudinary.v2.api.sub_folders(process.env.CLOUDINARY_FOLDER)
    const years = subfolders.folders.map(folder => folder.name)

    // Fetch the first image and the count of images of each subfolder
    const firstImagesAndCounts = await Promise.all(years.map(async (year) => {
        const results = await cloudinary.v2.search
            .expression(`folder:${process.env.CLOUDINARY_FOLDER}/${year}/*`)
            .sort_by('public_id', 'desc')
            .max_results(1)
            .execute()

        const resources = await cloudinary.v2.api.resources({
            type: 'upload',
            prefix: `${process.env.CLOUDINARY_FOLDER}/${year}/`,
            max_results: 500 // Maximum allowed value
        })

        const count = resources.resources.length

        // Check if an image exists before returning it
        return results.resources[0] ? {firstImage: results.resources[0], count} : {firstImage: null, count: 0}
    }))

    return {
        props: {
            years: years.map((year, index) => ({
                year,
                firstImage: firstImagesAndCounts[index].firstImage,
                count: firstImagesAndCounts[index].count
            }))
        }
    }
}
