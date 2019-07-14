[![Netlify Status](https://api.netlify.com/api/v1/badges/706d2e0c-095f-41f3-85aa-3f374f92686d/deploy-status)](https://app.netlify.com/sites/robertcooper/deploys)

# Personal Website

My personal website where I gather a bunch of front end web development thoughts in a blog and I also list some of my past projects.

## Formatting code blocks in markdown

In order to have the code be readable in articles, the code should be ran through the [following prettier playground config](https://prettier.io/playground/#N4Igxg9gdgLgprEAuEIA0IIAcYEtoDOyoAhgE5kQDuACuQkSiQG4S4Am6IARmSWAGs4MAMpZ+uKAHNkMMgFc4GABYwAtgBsA6stzwC4sHBEM9uZnoCeycASIZJBOGRg0+UtSWQAzEhqcYAFYEAB4AQnyCwiIkanAAMpJwPn4BIMEhIpJSGnAAivIQ8Cn+SiDiZE5kNjCWWHAEYGS4OFxYzbBaHDDKyAAcAAwY7RBOWnxYNu0NzszJGACOhfBu2IwgJAQAtFBwcOz7XGRwS7jHbiQeXki+pRhOariyCmUE2bkFRck3qWUwJNwuuwesgAEwYOQkXAabIAYQgak8Nig0HmIHkTgAKgDGLcnABffFAA). This will indent the code with 2 spaces and have a print width of 80 characters. Also a comment of \<!-- prettier-ignore --> will need to be added at the start of the code block to prevent automatic formatting of the code block.

## Videos

When taking video screen recordings on MacOS, the generated .mov file should be converted to both a `.mp4` and `.webm` formatted file. The `.webm` video will be served to browsers that support it and the `.mp4` file will be used as a default.

ffmepg is used to convert the video file formats from the command line. Here are the commands to run:

**WebM format**

```
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 50 -b:v 0 -b:a 128k -c:a libopus output.webm
```

**MP4 format**

```
ffmpeg -i input.mov -qscale 0 output.mp4
```

Documentation on ffmpeg can be [found here](https://ffmpeg.org/ffmpeg.html).
