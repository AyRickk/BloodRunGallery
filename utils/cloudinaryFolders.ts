// utils/cloudinaryFolders.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
async function fetchCloudinaryFolders() {
    try {
        let folders = new Set();
        let nextCursor = null;
        do {
            const result = await cloudinary.api.resources({
                type: 'upload',
                prefix: process.env.CLOUDINARY_FOLDER,
                max_results: 500,
                next_cursor: nextCursor
            });

            result.resources.forEach(resource => {
                const pathArray = resource.public_id.split('/bloodrun/');
                if (pathArray.length > 1) { // Vérifie si la ressource est dans un sous-dossier
                    folders.add(pathArray[0]); // Ajoute le nom du dossier
                }
            });

            nextCursor = result.next_cursor;
        } while (nextCursor);

        return Array.from(folders);
    } catch (error) {
        console.error('Error fetching folders from Cloudinary:', error);
        return [];
    }
}

export default fetchCloudinaryFolders;
