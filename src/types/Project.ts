import { FixedImage, FluidImage } from './Image';

export type Project = {
    node: {
        fields: {
            id: number;
            slug: string;
        };
        frontmatter: {
            title: string;
            subtitle: string;
            description: string;
            image: FixedImage & FluidImage;
            textColor: string;
            backgroundColor: string;
        };
    };
};
