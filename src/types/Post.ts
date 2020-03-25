export type Post = {
    node: {
        id: string;
        frontmatter: {
            title: string;
            description: string;
            formattedDate: string;
            dateTimeString: string;
            slug: string;
            categories: string[];
        };
        timeToRead: number;
    };
};
