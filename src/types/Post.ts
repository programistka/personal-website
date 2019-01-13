import { FluidImage } from './Image';

export type Post = {
    node: {
        id: number;
        frontmatter: {
            title: string;
            description: string;
            formattedDate: string;
            dateTimeString: string;
            banner: FluidImage;
            slug: string;
            categories: string[];
        }
        timeToRead: number;
    }
}