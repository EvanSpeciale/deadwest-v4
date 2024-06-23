import { Cloudinary } from "@cloudinary/url-gen"

const cld = new Cloudinary({
    cloud: {
        cloudName: 'dei6yb0qs'
    },
    url: {
        secure: true
    }
})

export function buildImage(src) {
    return cld.image(src).quality('auto').format('auto');
}