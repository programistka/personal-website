export enum VideoFormats {
    ogg = 'ogg',
    h264 = 'h264',
    webm = 'webm',
    vp9 = 'vp9',
    hls = 'hls',
}

export function supportsVideoType(type: VideoFormats) {
    if (typeof document === `undefined`) {
        return false;
    }
    let video;

    // Allow user to create shortcuts, i.e. just "webm"
    let formats = {
        ogg: 'video/ogg; codecs="theora"',
        h264: 'video/mp4; codecs="avc1.42E01E"',
        webm: 'video/webm; codecs="vp8, vorbis"',
        vp9: 'video/webm; codecs="vp9"',
        hls: 'application/x-mpegURL; codecs="avc1.42E01E"',
    };

    if (!video) {
        video = document.createElement('video');
    }

    return video.canPlayType(formats[type] || type) === 'probably';
}
