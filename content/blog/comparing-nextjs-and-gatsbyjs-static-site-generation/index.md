---
slug: '/comparing-nextjs-and-gatsbyjs-static-site-generation'
date: '2019-07-29'
title: 'Comparing NextJS and GatsbyJS Static Site Generation'
# Description should be no more than 160 characters in length
description: 'Learn the differences between how NextJS and GatsbyJS generate files used for a static website and which tool is best for which situations.'
categories: ['react', 'performance', 'javascript', 'gatsbyjs', 'nextjs']
banner: './images/banner.png'
---

import ButtonGroup from './ButtonGroup';

![Comparing NextJS and GatsbyJS Static Site Generation](./images/banner.png)

Both GatsbyJS and NextJS allow for the creation of static sites and so this post looks at both options when it comes to creating a static website.

In order to compare both GatsbyJS and NextJS, a simple 10 page website in both frameworks was created:

<ButtonGroup items={[{name: 'NextJS Demo Site', link: 'https://static-next.netlify.com/'}, {name: 'GatsbyJS Demo Site', link: 'https://static-gatsbyjs.netlify.com/'}]} />

![Home page of the demo website used to compare NextJS and GatsbyJS](./images/website.png)

## GatsbyJS & NextJS briefly explained

[GatsbyJS](https://www.gatsbyjs.org/) is deemed to be a **static site generator** because it generates a bunch of HTML files (along with corresponding JavaScript bundles) in a build process in order to create a static site that can be served on a web server.

[NextJS](https://nextjs.org/) is a React framework capable of doing building static websites along with server-side rendered websites.

## Development experience

Starting the development server is almost instantaneous with NextJS, while it takes around 15s for GatsbyJS. This is because GatsbyJS builds out all the pages during development whereas NextJS builds the pages on-demand.

After the development server is running, navigating between pages with NextJS is a bit slow because NextJS builds the pages on demand. That being said, when navigating back to a page that's already been built, it is instantaneous since the page does not need to be rebuilt. In comparison, navigating between pages with GatsbyJS is instantaneous from the get go.

## Production build

To generate the files for the static site, a build command needs to be executed. For NextJS you need to run `next build` followed by `next export` which will generate an `output` folder that will contain all the files needed to serve a static site. For GatsbyJS, the `gatsby build` command needs to be executed which will output all the generated files in a `public` directory.

Both GatsbyJS and NextJS will create an HTML file for each page on the site and link to JavaScript chunks/files which includes the necessary JavaScript needed for a page. One interesting thing I noticed was that GatsbyJS managed to inline a the necessary CSS for a page in the HTML file, whereas NextJS links to a CSS file from within the HTML file. This inlining of CSS has performance implications, which are mentioned in the next section.

## Production performance

When initially loading a page on NextJS, there is a flash of unstyled content because of the fact that the CSS needed for that page is not inlined into the HTML for that page. Comparatively, GatsbyJS does not flash an unstyled version of the page on the first page load.

Here are stats on the requested and loaded ressources for the initial load of the websites:

**NextJS**
![NextJS initial page load stats in the Chrome developer tools](./images/nextjs-initial-page-load.png)

**GatsbyJS**
![GatsbyJS initial page load stats in the Chrome developer tools](./images/gatsbyjs-initial-page-load.png)

GatsbyJS makes more than double the number of requests than NextJS (34 vs 16) because it does a request to a JSON file that contains additional data required for a page.

Also to note is that using NextJS results in a bit less data being transferred through network requests than with GatsbyJS (340 KB vs 346KB). Furthermore, page load times for NextJS are about half the times for the site built with GatsbyJS (490ms vs 978ms).

One interesting thing to note is that NextJS prefetches JavaScript for any page that is linked on the current page. That means that all the pages linked in the navbar will be prefetched and will load instantly when clicked. GatsbyJS does something similar, but Gatsby triggers the fetching of data when a user hovers over a page link.

<Video src="/gatsby-preloading" />

<span class="caption">GatsbyJS loads the JavaScript for other pages when a user hover's over a link for page.</span>

## Which framework should be used?

There a merits for using both frameworks, but here are some of the conclusions I have:

### NextJS

Building a static site with NextJS gives you the flexibility to switch to building a server-side rendered app if the need arises for dynamic website functionality. If unsure if your site will need include dynamic functionality, I would start out building the site with NextJS's static export feature in order to give you to opportunity to flexibly switch to a server-side rendered application down the road. With the release of NextJS v9, NextJS has some great performance optimizations for pages that don't require any sort of data fetching or dynamic behaviour ([read about NextJS's automatic static optimizations](https://nextjs.org/blog/next-9#automatic-static-optimization)).

### GatsbyJS

I haven't mentioned this yet, but GatsbyJS really shines as a framework when you want to aggregate data from one or many external sources (like a CMS) and generate a static site based on the aggregated data. For example creating a static blog with content coming from a CMS is easily done with GatsbyJS. GatsbyJS can easily build static pages based on content from a CMS, whereas this would be difficult to do with NextJS's static export feature.

---

If interested in the source code for the demos, it is accessible on Github:

<ButtonGroup items={[{name: 'NextJS Demo Repo', link: 'https://github.com/robertcoopercode/static-next'}, {name: 'GatsbyJS Demo Repo', link: 'https://github.com/robertcoopercode/static-gatsby'}]} />
