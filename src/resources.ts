const resources : any = [
    // UI Texture
    { name: "UI_Assets-0", type: "image", src: "data/img/UI_Assets-0.png" },
    { name: "UI_Assets-1", type: "image", src: "data/img/UI_Assets-1.png" },
    { name: "UI_Assets-2", type: "image", src: "data/img/UI_Assets-2.png" },

    // JSON texturePacker Atlas
    { name: "UI_Assets-0", type: "json", src: "data/img/UI_Assets-0.json" },
    { name: "UI_Assets-1", type: "json", src: "data/img/UI_Assets-1.json" },
    { name: "UI_Assets-2", type: "json", src: "data/img/UI_Assets-2.json" },

    // font face
    { name: "'kenpixel'", type: "binary",  src: "url('data/fnt/kenvector_future.woff2')" },
    /* Bitmap Text */
    {
        name: 'PressStart2P',
        type: 'image',
        src: './data/fnt/PressStart2P.png',
    },
    {
        name: 'PressStart2P',
        type: 'binary',
        src: './data/fnt/PressStart2P.fnt',
    },
];

export default resources;